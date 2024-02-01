import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserFilterDto } from './dto/user-filter.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Verifica se o email já existe
    await this.emailAlreadyExists(createUserDto.email);

    // Cria o usuário
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    // Remove a senha do objeto de retorno
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findAllWithFilter(query: UserFilterDto): Promise<User[]> {
    const filter = {
      ...(query.name && { name: ILike(`%${query.name}%`) }),
      ...(query.nroOAB && { nroOAB: ILike(`%${query.nroOAB}%`) }),
      ...(query.role && { role: ILike(`%${query.role}%`) }),
    };

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.userRepository.find({
      where: filter,
      order: sortObject,
      take: query.limit || undefined,
      skip: (query.page - 1) * query.limit || 0,
    });
  }

  async findOne(id: number): Promise<User> {
    // Tenta encontrar o usuário pelo id
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`);
    }
  }

  async findOneByEmail(
    email: string,
    withPassword: boolean = false,
  ): Promise<User> {
    const selectFields: any = ['id', 'name', 'email', 'role'];
    if (withPassword) selectFields.push('password');

    // Tenta encontrar o usuário pelo email
    try {
      return await this.userRepository.findOneOrFail({
        where: { email },
        select: [...selectFields],
      });
    } catch (error) {
      throw new NotFoundException('Email não encontrado.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Tenta encontrar o usuário pelo id
    const user = await this.findOne(id);

    // Verifica se o email já existe
    if (updateUserDto.email !== user.email) {
      await this.emailAlreadyExists(updateUserDto.email);
    }

    // Atualiza o usuário
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    // Tenta encontrar o usuário pelo id
    const user = await this.findOne(id);

    // Remove o usuário
    return await this.userRepository.delete(user.id);
  }

  async emailAlreadyExists(email: string): Promise<void> {
    if (await this.userRepository.findOne({ where: { email: Like(email) } })) {
      throw new BadRequestException('Email já cadastrado.');
    }
  }

  async checkCredentials(email: string, password: string): Promise<User> {
    // Tenta encontrar o usuário pelo email
    const user = await this.findOneByEmail(email, true);

    // Verifica se a senha está correta
    await this.passwordMatches(password, user.password);

    // Remove a senha do objeto de retorno
    delete user.password;
    return user;
  }

  async passwordMatches(password: string, hash: string): Promise<void> {
    if (!password || !hash)
      throw new BadRequestException('Senha não informada.');

    if (!(await bcrypt.compare(password, hash)))
      throw new BadRequestException('Senha incorreta.');
  }
}
