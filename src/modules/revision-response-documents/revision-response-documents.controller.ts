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
import { CreateRevisionResponseDocumentDto } from './dto/create-revision-response-document.dto';
import { RevisionResponseDocFilterDto } from './dto/revision-response-doc-filter.dto';
import { UpdateRevisionResponseDocumentDto } from './dto/update-revision-response-document.dto';
import { RevisionResponseDocumentsService } from './revision-response-documents.service';

@Controller('api')
export class RevisionResponseDocumentsController {
  constructor(
    private readonly revisionResponseDocumentsService: RevisionResponseDocumentsService,
  ) {}

  @Post('revision-response-document')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body()
    createRevisionResponseDocumentDto: CreateRevisionResponseDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createRevisionResponseDocumentDto.file = file;
    return this.revisionResponseDocumentsService.create(
      createRevisionResponseDocumentDto,
    );
  }

  @Get('revision-response-documents')
  async findAll(@Query() query: RevisionResponseDocFilterDto) {
    if (Object.keys(query).length)
      return this.revisionResponseDocumentsService.findAllWithFilter(query);
    return this.revisionResponseDocumentsService.findAll();
  }

  @Get('revision-response-document/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.revisionResponseDocumentsService.findOne(+id);
  }

  @Patch('revision-response-document/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateRevisionResponseDocumentDto: UpdateRevisionResponseDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateRevisionResponseDocumentDto.file = file;
    return this.revisionResponseDocumentsService.update(
      +id,
      updateRevisionResponseDocumentDto,
    );
  }

  @Delete('revision-response-document/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.revisionResponseDocumentsService.remove(+id);
  }
}
