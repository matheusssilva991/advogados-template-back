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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateResult } from 'typeorm';
import { CreateRevisionRequestDocumentDto } from './dto/create-revision-request-document.dto';
import { RevisionRequestDocFilterDto } from './dto/revision-request-doc-filter.dto';
import { UpdateRevisionRequestDocumentDto } from './dto/update-revision-request-document.dto';
import { RevisionRequestDocument } from './entities/revision-request-document.entity';
import { RevisionRequestDocumentsService } from './revision-request-documents.service';

@Controller('api')
export class RevisionRequestDocumentsController {
  constructor(
    private readonly revisionRequestDocumentsService: RevisionRequestDocumentsService,
  ) {}

  @Post('revision-request-document')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRevisionRequestDocumentDto: CreateRevisionRequestDocumentDto,
  ): Promise<RevisionRequestDocument> {
    createRevisionRequestDocumentDto.file = file;
    return this.revisionRequestDocumentsService.create(
      createRevisionRequestDocumentDto,
    );
  }

  @Get('revision-request-documents')
  async findAll(
    @Query() query: RevisionRequestDocFilterDto,
  ): Promise<RevisionRequestDocument[]> {
    if (Object.keys(query).length) {
      return this.revisionRequestDocumentsService.findAllWithFilter(query);
    }
    return this.revisionRequestDocumentsService.findAll();
  }

  @Get('revision-request-document/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionRequestDocument> {
    return this.revisionRequestDocumentsService.findOne(+id);
  }

  @Patch('revision-request-document/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevisionRequestDocumentDto: UpdateRevisionRequestDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateResult> {
    updateRevisionRequestDocumentDto.file = file;
    return this.revisionRequestDocumentsService.update(
      +id,
      updateRevisionRequestDocumentDto,
    );
  }

  @Delete('revision-request-document/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionRequestDocument> {
    return this.revisionRequestDocumentsService.remove(+id);
  }
}
