import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { User } from './entities/user.entity';

/**
 * Serviço de Gestão de Usuários
 *
 * Responsável por todas as operações relacionadas a usuários:
 * - Criação, leitura, atualização e remoção de usuários
 * - Busca com filtros (nome, OAB, cargo)
 * - Validação de emails duplicados
 * - Paginação e ordenação de resultados
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Cria um novo usuário no sistema
   *
   * @param createUserDto - Dados do usuário a ser criado
   * @returns Usuário criado (sem a senha por segurança)
   * @throws BadRequestException se o email já estiver cadastrado
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Valida se o email já está cadastrado
    await this.emailAlreadyExists(createUserDto.email);

    // Cria a instância do usuário e salva no banco
    // A senha é automaticamente criptografada via BeforeInsert hook na entidade
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    // Remove a senha do objeto de retorno por segurança
    delete user.password;
    return user;
  }

  /**
   * Retorna todos os usuários sem filtros
   *
   * @returns Lista de todos os usuários
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Busca usuários aplicando filtros, paginação e ordenação
   *
   * @param query - Objeto com filtros (nome, OAB, role), paginação e ordenação
   * @returns Lista de usuários que correspondem aos filtros
   *
   * Filtros suportados:
   * - name: Busca parcial case-insensitive
   * - nroOAB: Busca parcial case-insensitive
   * - role: Busca parcial case-insensitive
   * - limit: Quantidade de registros por página
   * - page: Número da página
   * - sort: JSON com chaves de ordenação (ex: {"name": "ASC"})
   */
  async findAllWithFilter(query: UserFilterDto): Promise<User[]> {
    // Constrói o objeto de filtros dinamicamente
    // ILike: busca case-insensitive com pattern matching
    const filter = {
      ...(query.name && { name: ILike(`%${query.name}%`) }),
      ...(query.nroOAB && { nroOAB: ILike(`%${query.nroOAB}%`) }),
      ...(query.role && { role: ILike(`%${query.role}%`) }),
    };

    // Parse da ordenação ou usa ordenação padrão por ID
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    // Executa a busca com filtros, ordenação e paginação
    return await this.userRepository.find({
      where: filter,
      order: sortObject,
      take: query.limit || undefined,           // Limite de registros
      skip: (query.page - 1) * query.limit || 0, // Offset para paginação
    });
  }

  /**
   * Busca um usuário por ID
   *
   * @param id - ID do usuário
   * @returns Usuário encontrado
   * @throws NotFoundException se o usuário não existir
   */
  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`);
    }
  }

  /**
   * Busca um usuário por email (usado na autenticação)
   *
   * @param email - Email do usuário
   * @returns Usuário encontrado (incluindo a senha para autenticação)
   * @throws NotFoundException se o email não existir
   *
   * Nota: Este método retorna a senha, usado apenas no processo de login
   */
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { email },
        // Seleciona explicitamente todos os campos incluindo password
        // Por padrão, password é excluído no select da entidade
        select: [
          'id',
          'name',
          'email',
          'password',      // Necessário para validação de login
          'phoneNumber',
          'nroOAB',
          'role',
          'createdAt',
          'updatedAt',
        ],
      });
    } catch (error) {
      throw new NotFoundException('Email não encontrado.');
    }
  }

  /**
   * Atualiza os dados de um usuário
   *
   * @param id - ID do usuário a ser atualizado
   * @param updateUserDto - Dados a serem atualizados
   * @returns Resultado da operação de atualização
   * @throws NotFoundException se o usuário não existir
   * @throws BadRequestException se tentar alterar para um email já cadastrado
   */
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    // Valida se o usuário existe
    const user = await this.findOne(id);

    // Se está alterando o email, verifica se o novo email já não está em uso
    if (updateUserDto.email !== user.email) {
      await this.emailAlreadyExists(updateUserDto.email);
    }

    // Atualiza os dados do usuário
    // Se a senha foi alterada, ela será criptografada via BeforeUpdate hook
    return await this.userRepository.update(id, updateUserDto);
  }

  /**
   * Remove um usuário do sistema
   *
   * @param id - ID do usuário a ser removido
   * @returns Usuário removido
   * @throws NotFoundException se o usuário não existir
   */
  async remove(id: number): Promise<User> {
    // Valida se o usuário existe
    const user = await this.findOne(id);

    // Remove o usuário do banco de dados
    return await this.userRepository.remove(user);
  }

  /**
   * Valida se um email já está cadastrado no sistema
   *
   * @param email - Email a ser validado
   * @throws BadRequestException se o email já existir
   *
   * Método auxiliar usado na criação e atualização de usuários
   */
  async emailAlreadyExists(email: string): Promise<void> {
    if (await this.userRepository.findOne({ where: { email: Like(email) } })) {
      throw new BadRequestException('Email já cadastrado.');
    }
  }
}

    }

    // Atualiza o usuário
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<User> {
    // Tenta encontrar o usuário pelo id
    const user = await this.findOne(id);

    // Remove o usuário
    return await this.userRepository.remove(user);
  }

  async emailAlreadyExists(email: string): Promise<void> {
    if (await this.userRepository.findOne({ where: { email: Like(email) } })) {
      throw new BadRequestException('Email já cadastrado.');
    }
  }
}
