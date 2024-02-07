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
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { SpecialtyFilterDto } from './dto/specialty-filter.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyService } from './specialty.service';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post('specialty')
  @Roles(Role.admin)
  async create(
    @Body() createSpecialtyDto: CreateSpecialtyDto,
  ): Promise<Specialty> {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get('specialties')
  @Roles(Role.admin, Role.lawyer)
  async findAll(@Query() query: SpecialtyFilterDto): Promise<Specialty[]> {
    if (Object.keys(this).length) {
      return this.specialtyService.findAllWithFilter(query);
    }
    return this.specialtyService.findAll();
  }

  @Get('specialty/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Specialty> {
    return this.specialtyService.findOne(+id);
  }

  @Patch('specialty/:id')
  @Roles(Role.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<UpdateResult> {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete('specialty/:id')
  @Roles(Role.admin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Specialty> {
    return this.specialtyService.remove(+id);
  }
}
