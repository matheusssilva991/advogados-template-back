import {
  BadRequestException,
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
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateResult } from 'typeorm';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { CreateProcessDto } from './dto/create-process.dto';
import { ProcessFilterDto } from './dto/process-filter.dto';
import { ReportFilterDto } from './dto/report-filter.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from './entities/process.entity';
import { ProcessService } from './process.service';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post('process')
  @Roles(Role.admin)
  async create(@Body() createProcessDto: CreateProcessDto): Promise<Process> {
    return this.processService.create(createProcessDto);
  }

  @Get('processes')
  @Roles(Role.admin, Role.lawyer)
  async findAll(@Query() query: ProcessFilterDto): Promise<Process[]> {
    if (Object.keys(query).length) {
      return this.processService.findAllWithFilter(query);
    }
    return this.processService.findAll();
  }

  @Get('process/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Process> {
    return this.processService.findOne(+id);
  }

  @Get('processes-report')
  @Roles(Role.admin, Role.lawyer)
  async getReportPDF(
    @Query() query: ReportFilterDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const buffer = await this.processService.generatePDF(query);

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': buffer.length,
        'Content-Disposition': 'attachment; filename=report.pdf',
      });

      res.end(buffer);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch('process/:id')
  @Roles(Role.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessDto: UpdateProcessDto,
  ): Promise<UpdateResult> {
    return this.processService.update(+id, updateProcessDto);
  }

  @Patch('processes')
  @Roles(Role.admin)
  async updateAll(@Body('ids', ParseArrayPipe) ids: number[]): Promise<object> {
    return this.processService.updateMany(ids);
  }

  @Delete('process/:id')
  @Roles(Role.admin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Process> {
    return this.processService.remove(+id);
  }

  @Delete('processes')
  @Roles(Role.admin)
  async removeAll(@Body('ids', ParseArrayPipe) ids: number[]): Promise<object> {
    return this.processService.removeMany(ids);
  }
}
