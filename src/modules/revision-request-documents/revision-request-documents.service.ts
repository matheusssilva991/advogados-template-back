import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Repository, UpdateResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from '../file/file.service';
import { RevisionRequestService } from '../revision-request/revision-request.service';
import { CreateRevisionRequestDocumentDto } from './dto/create-revision-request-document.dto';
import { RevisionRequestDocFilterDto } from './dto/revision-request-doc-filter.dto';
import { UpdateRevisionRequestDocumentDto } from './dto/update-revision-request-document.dto';
import { RevisionRequestDocument } from './entities/revision-request-document.entity';

@Injectable()
export class RevisionRequestDocumentsService {
  constructor(
    @InjectRepository(RevisionRequestDocument)
    private revisionRequestDocumentRepository: Repository<RevisionRequestDocument>,
    private readonly revisionRequestService: RevisionRequestService,
    private readonly fileService: FileService,
  ) {}

  async create(
    createRevisionRequestDocumentDto: CreateRevisionRequestDocumentDto,
  ): Promise<RevisionRequestDocument> {
    // Verifica se a requisição de revisão existe
    await this.revisionRequestService.findOne(
      createRevisionRequestDocumentDto.revisionRequestId,
    );

    // verifica se o arquivo foi enviado
    if (!createRevisionRequestDocumentDto.file) {
      throw new BadRequestException('Arquivo é obrigatório.');
    }

    try {
      const file = createRevisionRequestDocumentDto.file;
      const processId = createRevisionRequestDocumentDto.revisionRequestId;
      const [fileName, ext] = file.originalname.split('.');
      const path = this.makePath(`${fileName}-${uuidv4()}.${ext}`);

      createRevisionRequestDocumentDto['fileName'] = file.originalname;
      createRevisionRequestDocumentDto['filePath'] = path;
      createRevisionRequestDocumentDto['contentLength'] =
        createRevisionRequestDocumentDto.file.size;
      createRevisionRequestDocumentDto['processId'] = processId;
      createRevisionRequestDocumentDto['contentType'] =
        createRevisionRequestDocumentDto.file.mimetype;

      // salva o arquivo
      await this.fileService.upload(file, path);

      // cria o documento de requisição de revisão
      const revisionRequestDocument =
        this.revisionRequestDocumentRepository.create(
          createRevisionRequestDocumentDto,
        );

      return await this.revisionRequestDocumentRepository.save(
        revisionRequestDocument,
      );
    } catch (error) {
      throw new BadRequestException(
        'Erro ao criar o documento de requisição de revisão.',
      );
    }
  }

  async findAll(): Promise<RevisionRequestDocument[]> {
    return await this.revisionRequestDocumentRepository.find();
  }

  async findAllWithFilter(
    query: RevisionRequestDocFilterDto,
  ): Promise<RevisionRequestDocument[]> {
    const { withRevisionRequest, limit, page, sort } = query;

    const filter = {
      ...(query.process && { revisionRequest: { processId: query.process } }),
      ...(query.revisionRequest && {
        revisionRequestId: query.revisionRequest,
      }),
    };

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.revisionRequestDocumentRepository.find({
      where: filter,
      relations: withRevisionRequest === 'true' ? ['revision_request'] : [],
      order: sortObject,
      take: limit,
      skip: limit * (page - 1) || 0,
    });
  }

  async findOne(id: number): Promise<RevisionRequestDocument> {
    try {
      return await this.revisionRequestDocumentRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      throw new NotFoundException(
        `Requisição de revisão id ${id} não encontrada.`,
      );
    }
  }

  async update(
    id: number,
    updateRevisionRequestDocumentDto: UpdateRevisionRequestDocumentDto,
  ): Promise<UpdateResult> {
    // Verifica se a requisição de revisão existe
    const revisionRequestDocument = await this.findOne(id);

    if (updateRevisionRequestDocumentDto.revisionRequestId) {
      // Verifica se a requisição de revisão existe
      await this.revisionRequestService.findOne(
        updateRevisionRequestDocumentDto.revisionRequestId,
      );
    }

    if (updateRevisionRequestDocumentDto.file) {
      try {
        const file = updateRevisionRequestDocumentDto.file;
        const [fileName, ext] = file.originalname.split('.');
        const path = this.makePath(`${fileName}-${uuidv4()}.${ext}`);

        updateRevisionRequestDocumentDto['fileName'] = file.originalname;
        updateRevisionRequestDocumentDto['filePath'] = path;
        updateRevisionRequestDocumentDto['contentLength'] = file.size;
        updateRevisionRequestDocumentDto['contentType'] = file.mimetype;

        // Exclui o antigo e salva o novo atualizado arquivo
        await this.fileService.deleteFile(revisionRequestDocument.filePath);
        delete updateRevisionRequestDocumentDto.file;
        await this.fileService.upload(file, path);
      } catch (error) {
        throw new BadRequestException(
          'Erro ao atualizar o documento de requisição de revisão.',
        );
      }
    }

    return await this.revisionRequestDocumentRepository.update(
      id,
      updateRevisionRequestDocumentDto,
    );
  }

  async remove(id: number): Promise<RevisionRequestDocument> {
    const revisionRequestDocument = await this.findOne(id);
    return await this.revisionRequestDocumentRepository.remove(
      revisionRequestDocument,
    );
  }

  makePath(fileName: string): string {
    return join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'upload',
      'revision-request-document',
      fileName,
    );
  }
}
