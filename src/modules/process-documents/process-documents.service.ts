import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { Repository, UpdateResult } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProcessService } from '../process/process.service';
import { FileService } from './../file/file.service';
import { CreateProcessDocumentDto } from './dto/create-process-document.dto';
import { ProcessDocumentFilterDto } from './dto/process-document-filter.dto';
import { UpdateProcessDocumentDto } from './dto/update-process-document.dto';
import { ProcessDocument } from './entities/process-document.entity';

@Injectable()
export class ProcessDocumentsService {
  constructor(
    @InjectRepository(ProcessDocument)
    private processDocumentRepository: Repository<ProcessDocument>,
    @Inject(forwardRef(() => ProcessService))
    private processService: ProcessService,
    private fileService: FileService,
  ) {}

  async create(
    createProcessDocumentDto: CreateProcessDocumentDto,
  ): Promise<ProcessDocument> {
    // verifica se o processo existe
    await this.processService.findOne(createProcessDocumentDto.processId);

    // verifica se o arquivo foi enviado
    if (!createProcessDocumentDto.file) {
      throw new BadRequestException('Arquivo é obrigatório.');
    }

    try {
      const file = createProcessDocumentDto.file;
      const processId = createProcessDocumentDto.processId;
      const [fileName, ext] = file.originalname.split('.');
      const path = this.makePath(`${fileName}-${uuidv4()}.${ext}`);

      createProcessDocumentDto['fileName'] = file.originalname;
      createProcessDocumentDto['filePath'] = path;
      createProcessDocumentDto['contentLength'] =
        createProcessDocumentDto.file.size;
      createProcessDocumentDto['processId'] = processId;
      createProcessDocumentDto['contentType'] =
        createProcessDocumentDto.file.mimetype;

      // salva o arquivo
      await this.fileService.upload(file, path);

      // cria o documento de processo
      const processDocument = this.processDocumentRepository.create(
        createProcessDocumentDto,
      );

      return await this.processDocumentRepository.save(processDocument);
    } catch (error) {
      throw new BadRequestException(error);
      //throw new BadRequestException('Erro ao criar o documento de processo.');
    }
  }

  async findAll(): Promise<ProcessDocument[]> {
    return await this.processDocumentRepository.find();
  }

  async findAllWithFilter(
    query: ProcessDocumentFilterDto,
  ): Promise<ProcessDocument[]> {
    const { process, withProcess, limit, page, sort } = query;
    const where = process ? { processId: process } : {};

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.processDocumentRepository.find({
      where,
      relations: withProcess === 'true' ? ['process'] : [],
      order: sortObject,
      take: limit,
      skip: limit * (page - 1) || 0,
    });
  }

  async findOne(id: number): Promise<ProcessDocument> {
    try {
      return await this.processDocumentRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(
        `Documento de processo ${id} não encontrado.`,
      );
    }
  }

  async update(
    id: number,
    updateProcessDocumentDto: UpdateProcessDocumentDto,
  ): Promise<UpdateResult> {
    // verifica se o documento de processo existe
    const processDocument = await this.findOne(id);
    // verifica se o processo existe
    if (updateProcessDocumentDto.processId) {
      await this.processService.findOne(updateProcessDocumentDto.processId);
    }

    if (updateProcessDocumentDto.file) {
      try {
        const file = updateProcessDocumentDto.file;
        const [fileName, ext] = file.originalname.split('.');
        const path = this.makePath(`${fileName}-${uuidv4()}.${ext}`);

        updateProcessDocumentDto['fileName'] = file.originalname;
        updateProcessDocumentDto['filePath'] = path;
        updateProcessDocumentDto['contentLength'] = file.size;
        updateProcessDocumentDto['contentType'] = file.mimetype;

        // Exclui o antigo e salva o novo atualizado arquivo
        await this.fileService.deleteFile(processDocument.filePath);
        delete updateProcessDocumentDto.file;
        await this.fileService.upload(file, path);
      } catch (error) {
        throw new BadRequestException(
          'Erro ao atualizar o documento de processo.',
        );
      }
    }

    return await this.processDocumentRepository.update(
      id,
      updateProcessDocumentDto,
    );
  }

  async remove(id: number): Promise<ProcessDocument> {
    const processDocument = await this.findOne(id);
    return await this.processDocumentRepository.remove(processDocument);
  }

  makePath(fileName: string): string {
    return join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'upload',
      'process-document',
      fileName,
    );
  }
}
