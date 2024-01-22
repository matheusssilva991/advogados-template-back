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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryFilterDto } from './dto/category-filter.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('api')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('category')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('categories')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: CategoryFilterDto): Promise<Category[]> {
    if (Object.keys(query).length) {
      return await this.categoryService.findAllWithFilter(query);
    }
    return this.categoryService.findAll();
  }

  @Get('category/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.findOne(+id);
  }

  @Patch('category/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<any> {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('category/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.categoryService.remove(+id);
  }
}
