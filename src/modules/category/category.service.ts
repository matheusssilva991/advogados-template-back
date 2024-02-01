import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CategoryFilterDto } from './dto/category-filter.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Verifica se a categoria já existe
    await this.categoryAlreadyExists(createCategoryDto.name);

    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findAllWithFilter(query: CategoryFilterDto) {
    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.categoryRepository.find({
      order: sortObject,
      take: query.limit || undefined,
      skip: (query.page - 1) * query.limit || 0,
    });
  }

  async findOne(id: number): Promise<Category> {
    // Tenta encontrar a categoria pelo id
    try {
      return await this.categoryRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Categoria ${id} não encontrada.`);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    // Tenta encontrar a categoria pelo id
    const category = await this.findOne(id);

    // Verifica se a categoria já existe
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      await this.categoryAlreadyExists(updateCategoryDto.name);
    }

    // Atualiza a categoria
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<any> {
    // Tenta encontrar a categoria pelo id
    await this.findOne(id);

    // Remove a categoria
    return await this.categoryRepository.delete(id);
  }

  async categoryAlreadyExists(name: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { name: Like(name) },
    });
    if (category) {
      throw new BadRequestException('Categoria já existe.');
    }
  }
}
