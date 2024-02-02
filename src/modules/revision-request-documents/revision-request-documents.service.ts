import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { FileService } from '../file/file.service';
import { RevisionRequestService } from '../revision-request/revision-request.service';
import { CreateRevisionRequestDocumentDto } from './dto/create-revision-request-document.dto';
import { UpdateRevisionRequestDocumentDto } from './dto/update-revision-request-document.dto';
import { RevisionRequestDocument } from './entities/revision-request-document.entity';
import { RevisionRequestDocFilterDto } from './dto/revision-request-doc-filter.dto';

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
  ) {
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
      throw new BadRequestException('Erro ao criar o documento de processo.');
    }
  }

  async findAll() {
    return await this.revisionRequestDocumentRepository.find();
  }

  async findAllWithFilter(query: RevisionRequestDocFilterDto) {
    const { revisionRequest, withRevisionRequest, limit, page, sort } = query;
    const where = revisionRequest ? { revisionRequestId: revisionRequest } : {};

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.revisionRequestDocumentRepository.find({
      where,
      relations: withRevisionRequest === 'true' ? ['revision_request'] : [],
      order: sortObject,
      take: limit,
      skip: limit * (page - 1) || 0,
    });
  }

  async findOne(id: number) {
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
  ) {
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
          'Erro ao atualizar o documento de processo.',
        );
      }
    }

    return await this.revisionRequestDocumentRepository.update(
      id,
      updateRevisionRequestDocumentDto,
    );
  }

  async remove(id: number) {
    const revisionRequestDocument = await this.findOne(id);
    return await this.revisionRequestDocumentRepository.remove(
      revisionRequestDocument,
    );
  }

  async removeFilesByRevisionRequestId(revisionRequestId: number) {
    const revisionRequestDocuments =
      await this.revisionRequestDocumentRepository.find({
        where: { revisionRequestId },
      });

    revisionRequestDocuments.forEach(async (revisionRequestDocument) => {
      await this.fileService.deleteFile(revisionRequestDocument.filePath);
    });
  }

  async removeFilesByProcessId(processId: number) {
    const revisionRequestDocuments =
      await this.revisionRequestDocumentRepository.find({
        relations: ['revisionRequest'],
        where: { revisionRequest: { processId } },
      });

    revisionRequestDocuments.forEach(async (revisionRequestDocument) => {
      await this.fileService.deleteFile(revisionRequestDocument.filePath);
    });
  }

  makePath(fileName: string) {
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
