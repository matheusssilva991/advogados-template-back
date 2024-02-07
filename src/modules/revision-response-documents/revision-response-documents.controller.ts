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
import { CreateRevisionResponseDocumentDto } from './dto/create-revision-response-document.dto';
import { RevisionResponseDocFilterDto } from './dto/revision-response-doc-filter.dto';
import { UpdateRevisionResponseDocumentDto } from './dto/update-revision-response-document.dto';
import { RevisionResponseDocument } from './entities/revision-response-document.entity';
import { RevisionResponseDocumentsService } from './revision-response-documents.service';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RevisionResponseDocumentsController {
  constructor(
    private readonly revisionResponseDocumentsService: RevisionResponseDocumentsService,
  ) {}

  @Post('revision-response-document')
  @Roles(Role.admin)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body()
    createRevisionResponseDocumentDto: CreateRevisionResponseDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<RevisionResponseDocument> {
    createRevisionResponseDocumentDto.file = file;
    return this.revisionResponseDocumentsService.create(
      createRevisionResponseDocumentDto,
    );
  }

  @Get('revision-response-documents')
  @Roles(Role.admin, Role.lawyer)
  async findAll(
    @Query() query: RevisionResponseDocFilterDto,
  ): Promise<RevisionResponseDocument[]> {
    if (Object.keys(query).length)
      return this.revisionResponseDocumentsService.findAllWithFilter(query);
    return this.revisionResponseDocumentsService.findAll();
  }

  @Get('revision-response-document/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionResponseDocument> {
    return this.revisionResponseDocumentsService.findOne(+id);
  }

  @Patch('revision-response-document/:id')
  @Roles(Role.admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateRevisionResponseDocumentDto: UpdateRevisionResponseDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateResult> {
    updateRevisionResponseDocumentDto.file = file;
    return this.revisionResponseDocumentsService.update(
      +id,
      updateRevisionResponseDocumentDto,
    );
  }

  @Delete('revision-response-document/:id')
  @Roles(Role.admin)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionResponseDocument> {
    return this.revisionResponseDocumentsService.remove(+id);
  }
}
