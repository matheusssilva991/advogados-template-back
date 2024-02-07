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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateResult } from 'typeorm';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { CreateProcessDocumentDto } from './dto/create-process-document.dto';
import { ProcessDocumentFilterDto } from './dto/process-document-filter.dto';
import { UpdateProcessDocumentDto } from './dto/update-process-document.dto';
import { ProcessDocument } from './entities/process-document.entity';
import { ProcessDocumentsService } from './process-documents.service';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProcessDocumentsController {
  constructor(
    private readonly processDocumentsService: ProcessDocumentsService,
  ) {}

  @Post('process-document')
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProcessDocumentDto: CreateProcessDocumentDto,
  ): Promise<ProcessDocument> {
    createProcessDocumentDto.file = file;
    return this.processDocumentsService.create(createProcessDocumentDto);
  }

  @Get('process-documents')
  @Roles(Role.admin, Role.lawyer)
  async findAll(
    @Query() query: ProcessDocumentFilterDto,
  ): Promise<ProcessDocument[]> {
    if (Object.keys(query).length) {
      return this.processDocumentsService.findAllWithFilter(query);
    }
    return this.processDocumentsService.findAll();
  }

  @Get('process-document/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProcessDocument> {
    return this.processDocumentsService.findOne(+id);
  }

  @Patch('process-document/:id')
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessDocumentDto: UpdateProcessDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateResult> {
    updateProcessDocumentDto.file = file;
    return this.processDocumentsService.update(+id, updateProcessDocumentDto);
  }

  @Delete('process-document/:id')
  @Roles(Role.admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProcessDocument> {
    return this.processDocumentsService.remove(+id);
  }
}
