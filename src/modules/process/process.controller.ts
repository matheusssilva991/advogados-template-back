import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessFilterDto } from './dto/process-filter.dto';

@Controller('api')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post('process')
  create(@Body() createProcessDto: CreateProcessDto) {
    return this.processService.create(createProcessDto);
  }

  @Get('processes')
  findAll(@Query() query: ProcessFilterDto) {
    if (Object.keys(query).length) {
      return this.processService.findAllWithFilter(query);
    }
    return this.processService.findAll();
  }

  @Get('process/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.processService.findOne(+id);
  }

  @Patch('process/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessDto: UpdateProcessDto,
  ) {
    return this.processService.update(+id, updateProcessDto);
  }

  @Patch('processes')
  updateAll(@Body('ids', ParseArrayPipe) ids: number[]) {
    return this.processService.updateMany(ids);
  }

  @Delete('process/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.processService.remove(+id);
  }

  @Delete('processes')
  removeAll(@Body('ids', ParseArrayPipe) ids: number[]) {
    return this.processService.removeMany(ids);
  }
}
