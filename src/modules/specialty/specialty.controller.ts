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
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { SpecialtyFilterDto } from './dto/specialty-filter.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';

@Controller('api')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post('specialty')
  async create(
    @Body() createSpecialtyDto: CreateSpecialtyDto,
  ): Promise<Specialty> {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get('specialties')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: SpecialtyFilterDto): Promise<Specialty[]> {
    if (Object.keys(this).length) {
      return this.specialtyService.findAllWithFilter(query);
    }
    return this.specialtyService.findAll();
  }

  @Get('specialty/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Specialty> {
    return this.specialtyService.findOne(+id);
  }

  @Patch('specialty/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<any> {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete('specialty/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.specialtyService.remove(+id);
  }
}
