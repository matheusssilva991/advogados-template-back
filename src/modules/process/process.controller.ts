import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateProcessDto } from './dto/create-process.dto';
import { ProcessFilterDto } from './dto/process-filter.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from './entities/process.entity';
import { ProcessService } from './process.service';

@Controller('api')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post('process')
  async create(@Body() createProcessDto: CreateProcessDto): Promise<Process> {
    return this.processService.create(createProcessDto);
  }

  @Get('processes')
  async findAll(@Query() query: ProcessFilterDto): Promise<Process[]> {
    if (Object.keys(query).length) {
      return this.processService.findAllWithFilter(query);
    }
    return this.processService.findAll();
  }

  @Get('process/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Process> {
    return this.processService.findOne(+id);
  }

  @Patch('process/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessDto: UpdateProcessDto,
  ): Promise<UpdateResult> {
    return this.processService.update(+id, updateProcessDto);
  }

  @Patch('processes')
  async updateAll(@Body('ids', ParseArrayPipe) ids: number[]): Promise<object> {
    return this.processService.updateMany(ids);
  }

  @Delete('process/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Process> {
    return this.processService.remove(+id);
  }

  @Delete('processes')
  async removeAll(@Body('ids', ParseArrayPipe) ids: number[]): Promise<object> {
    return this.processService.removeMany(ids);
  }
}
