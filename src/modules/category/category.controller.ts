import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { CategoryService } from './category.service';
import { CategoryFilterDto } from './dto/category-filter.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  @Roles(Role.admin)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('categories')
  @Roles(Role.admin, Role.lawyer)
  async findAll(@Query() query: CategoryFilterDto): Promise<Category[]> {
    if (Object.keys(query).length) {
      return await this.categoryService.findAllWithFilter(query);
    }
    return this.categoryService.findAll();
  }

  @Get('category/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @Patch('category/:id')
  @Roles(Role.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('category/:id')
  @Roles(Role.admin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.remove(+id);
  }
}
