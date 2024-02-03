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
import { RevisionResponseService } from '../revision-response/revision-response.service';
import { CreateRevisionResponseDocumentDto } from './dto/create-revision-response-document.dto';
import { RevisionResponseDocFilterDto } from './dto/revision-response-doc-filter.dto';
import { UpdateRevisionResponseDocumentDto } from './dto/update-revision-response-document.dto';
import { RevisionResponseDocument } from './entities/revision-response-document.entity';

@Injectable()
export class RevisionResponseDocumentsService {
  constructor(
    @InjectRepository(RevisionResponseDocument)
    private revisionResponseDocumentRepository: Repository<RevisionResponseDocument>,
    private readonly revisionResponseService: RevisionResponseService,
    private readonly fileService: FileService,
  ) {}

  async create(
    createRevisionResponseDocumentDto: CreateRevisionResponseDocumentDto,
  ) {
    // Verifica se a resposta de revisão existe
    await this.revisionResponseService.findOne(
      createRevisionResponseDocumentDto.revisionResponseId,
    );

    // verifica se o arquivo foi enviado
    if (!createRevisionResponseDocumentDto.file) {
      throw new BadRequestException('Arquivo é obrigatório.');
    }

    try {
      const file = createRevisionResponseDocumentDto.file;
      const processId = createRevisionResponseDocumentDto.revisionResponseId;
      const [fileName, ext] = file.originalname.split('.');
      const path = this.makePath(`${fileName}-${uuidv4()}.${ext}`);

      createRevisionResponseDocumentDto['fileName'] = file.originalname;
      createRevisionResponseDocumentDto['filePath'] = path;
      createRevisionResponseDocumentDto['contentLength'] =
        createRevisionResponseDocumentDto.file.size;
      createRevisionResponseDocumentDto['processId'] = processId;
      createRevisionResponseDocumentDto['contentType'] =
        createRevisionResponseDocumentDto.file.mimetype;

      // salva o arquivo
      await this.fileService.upload(file, path);

      // cria o documento da resposta de revisão
      const revisionResponseDocument =
        this.revisionResponseDocumentRepository.create(
          createRevisionResponseDocumentDto,
        );

      return await this.revisionResponseDocumentRepository.save(
        revisionResponseDocument,
      );
    } catch (error) {
      throw new BadRequestException(
        'Erro ao criar o documento de resposta de revisão.',
      );
    }
  }

  async findAll() {
    return await this.revisionResponseDocumentRepository.find();
  }

  async findAllWithFilter(query: RevisionResponseDocFilterDto) {
    console.log(query);
    return await this.revisionResponseDocumentRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.revisionResponseDocumentRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      throw new NotFoundException(
        `Documento de resposta de revisão ${id} não encontrado.`,
      );
    }
  }

  async update(
    id: number,
    updateRevisionResponseDocumentDto: UpdateRevisionResponseDocumentDto,
  ) {
    // Verifica se a resposta de revisão existe
    const revisionResponseDocument = await this.findOne(id);

    if (updateRevisionResponseDocumentDto.revisionResponseId) {
      await this.revisionResponseService.findOne(
        updateRevisionResponseDocumentDto.revisionResponseId,
      );
    }

    if (updateRevisionResponseDocumentDto.file) {
      try {
        const file = updateRevisionResponseDocumentDto.file;
        const [fileName, ext] = file.originalname.split('.');
        const path = this.makePath(`${fileName}-${uuidv4()}.${ext}`);

        updateRevisionResponseDocumentDto['fileName'] = file.originalname;
        updateRevisionResponseDocumentDto['filePath'] = path;
        updateRevisionResponseDocumentDto['contentLength'] = file.size;
        updateRevisionResponseDocumentDto['contentType'] = file.mimetype;

        // Exclui o antigo e salva o novo atualizado arquivo
        await this.fileService.deleteFile(revisionResponseDocument.filePath);
        delete updateRevisionResponseDocumentDto.file;
        await this.fileService.upload(file, path);
      } catch (error) {
        throw new BadRequestException(
          'Erro ao atualizar o documento de resposta de revisão.',
        );
      }
    }

    return await this.revisionResponseDocumentRepository.update(
      id,
      updateRevisionResponseDocumentDto,
    );
  }

  async remove(id: number) {
    const revisionResponseDocument = await this.findOne(id);
    return await this.revisionResponseDocumentRepository.remove(
      revisionResponseDocument,
    );
  }

  makePath(fileName: string) {
    return join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'upload',
      'revision-response-document',
      fileName,
    );
  }
}
