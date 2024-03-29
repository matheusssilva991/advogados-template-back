import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { SpecialtyFilterDto } from './dto/specialty-filter.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    // Verifica se o usuário existe
    await this.userService.findOne(createSpecialtyDto.userId);

    // Verifica se a categoria existe
    await this.categoryService.findOne(createSpecialtyDto.categoryId);

    // Verifica se a especialidade já foi cadastrada para o usuário
    await this.specialtyUserExists(
      createSpecialtyDto.userId,
      createSpecialtyDto.categoryId,
    );

    const user = await this.userService.findOne(createSpecialtyDto.userId);

    if (user.role === Role.admin) {
      throw new BadRequestException(
        'Somente advogados podem ter especialidades.',
      );
    }

    const specialty = this.specialtyRepository.create(createSpecialtyDto);
    return this.specialtyRepository.save(specialty);
  }

  async findAll(): Promise<Specialty[]> {
    return await this.specialtyRepository.find({
      relations: ['category'],
    });
  }

  async findAllWithFilter(query: SpecialtyFilterDto): Promise<Specialty[]> {
    const relations = [];

    // Trazer dados do usuário e/ou categoria junto com a especialidade
    query.withUser === 'true' && relations.push('user');
    query.withCategory === 'true' && relations.push('category');

    const filter = {
      ...(query.user && { userId: query.user }),
      ...(query.category && { categoryId: query.category }),
    };

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.specialtyRepository.find({
      where: filter,
      order: sortObject,
      take: query.limit || undefined,
      skip: (query.page - 1) * query.limit || 0,
      relations: relations,
    });
  }

  async findOne(id: number): Promise<Specialty> {
    try {
      return await this.specialtyRepository.findOneOrFail({
        where: { id },
        relations: ['category'],
      });
    } catch (error) {
      throw new NotFoundException(`Especialidade ${id} não encontrada.`);
    }
  }

  async update(
    id: number,
    updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<UpdateResult> {
    // Verifica se a especialidade existe
    const specialty = await this.findOne(id);

    // Verifica se o usuário existe
    if (updateSpecialtyDto.userId) {
      const user = await this.userService.findOne(updateSpecialtyDto.userId);

      if (user.role === Role.admin) {
        throw new BadRequestException(
          'Somente advogados podem ter especialidades.',
        );
      }
    }

    // Verifica se a categoria existe
    if (updateSpecialtyDto.categoryId) {
      await this.categoryService.findOne(updateSpecialtyDto.categoryId);

      // Se a categoria for alterada, verifica se a especialidade já foi cadastrada para o usuário
      if (specialty.categoryId !== updateSpecialtyDto.categoryId) {
        await this.specialtyUserExists(
          updateSpecialtyDto.userId || specialty.userId,
          updateSpecialtyDto.categoryId,
        );
      }
    }

    return await this.specialtyRepository.update(id, updateSpecialtyDto);
  }

  async remove(id: number): Promise<Specialty> {
    // Verifica se a especialidade existe
    const specialty = await this.findOne(id);

    return await this.specialtyRepository.remove(specialty);
  }

  async specialtyUserExists(userId: number, categoryId: number): Promise<void> {
    if (!userId || !categoryId) {
      throw new BadRequestException(
        'ID de usuário e/ou categoria inválido(s).',
      );
    }

    const countSpecialty = await this.specialtyRepository.count({
      where: {
        userId: userId,
        categoryId: categoryId,
      },
    });

    if (countSpecialty > 0) {
      throw new BadRequestException(
        'Essa especialidade já foi cadastrada para esse usuário.',
      );
    }
  }
}
