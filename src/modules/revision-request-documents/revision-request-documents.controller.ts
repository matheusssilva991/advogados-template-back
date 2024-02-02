import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRevisionRequestDocumentDto } from './dto/create-revision-request-document.dto';
import { UpdateRevisionRequestDocumentDto } from './dto/update-revision-request-document.dto';
import { RevisionRequestDocumentsService } from './revision-request-documents.service';
import { FileInterceptor } from '@nestjs/platform-express';

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
  ) {
    createRevisionRequestDocumentDto.file = file;
    return this.revisionRequestDocumentsService.create(
      createRevisionRequestDocumentDto,
    );
  }

  @Get('revision-request-documents')
  async findAll() {
    return this.revisionRequestDocumentsService.findAll();
  }

  @Get('revision-request-document/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.revisionRequestDocumentsService.findOne(+id);
  }

  @Patch('revision-request-document/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevisionRequestDocumentDto: UpdateRevisionRequestDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateRevisionRequestDocumentDto.file = file;
    return this.revisionRequestDocumentsService.update(
      +id,
      updateRevisionRequestDocumentDto,
    );
  }

  @Delete('revision-request-document/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.revisionRequestDocumentsService.remove(+id);
  }
}
