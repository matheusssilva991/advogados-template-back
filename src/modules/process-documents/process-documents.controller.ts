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
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProcessDocumentDto } from './dto/create-process-document.dto';
import { UpdateProcessDocumentDto } from './dto/update-process-document.dto';
import { ProcessDocumentsService } from './process-documents.service';

@Controller('api')
export class ProcessDocumentsController {
  constructor(
    private readonly processDocumentsService: ProcessDocumentsService,
  ) {}

  @Post('process-document')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProcessDocumentDto: CreateProcessDocumentDto,
  ) {
    createProcessDocumentDto.file = file;
    return this.processDocumentsService.create(createProcessDocumentDto);
  }

  @Get('process-documents')
  async findAll() {
    return this.processDocumentsService.findAll();
  }

  @Get('process-document/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.processDocumentsService.findOne(+id);
  }

  @Patch('process-document/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProcessDocumentDto: UpdateProcessDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateProcessDocumentDto.file = file;
    return this.processDocumentsService.update(+id, updateProcessDocumentDto);
  }

  @Delete('process-document/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.processDocumentsService.remove(+id);
  }
}
