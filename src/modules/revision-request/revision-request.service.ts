import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ProcessService } from '../process/process.service';
import { CreateRevisionRequestDto } from './dto/create-revision-request.dto';
import { RevisionRequestFilterDto } from './dto/revision-request-filter.dto';
import { UpdateRevisionRequestDto } from './dto/update-revision-request.dto';
import { RevisionRequest } from './entities/revision-request.entity';

@Injectable()
export class RevisionRequestService {
  constructor(
    @InjectRepository(RevisionRequest)
    private revisionRequestRepository: Repository<RevisionRequest>,
    private readonly processService: ProcessService,
  ) {}

  async create(createRevisionRequestDto: CreateRevisionRequestDto) {
    // Verifica se o processo existe
    await this.processService.findOne(createRevisionRequestDto.processId);

    const revisionRequest = this.revisionRequestRepository.create(
      createRevisionRequestDto,
    );
    return await this.revisionRequestRepository.save(revisionRequest);
  }

  async findAll() {
    return await this.revisionRequestRepository.find();
  }

  async findAllWithFilter(query: RevisionRequestFilterDto) {
    const relations = [];

    // Trazer dados do processo
    query.withProcess === 'true' && relations.push('process');

    const filter = {
      ...(query.title && {
        title: ILike(`%${query.title}%`),
      }),
      ...(query.description && {
        description: ILike(`%${query.description}%`),
      }),
      ...(query.process && { processId: query.process }),
    };

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.revisionRequestRepository.find({
      where: filter,
      order: sortObject,
      take: query.limit || undefined,
      skip: (query.page - 1) * query.limit || 0,
      relations: relations,
    });
  }

  async findOne(id: number) {
    try {
      return await this.revisionRequestRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(
        `Solicitação de revisão de processo ${id} não encontrada.`,
      );
    }
  }

  async update(id: number, updateRevisionRequestDto: UpdateRevisionRequestDto) {
    if (updateRevisionRequestDto.processId) {
      await this.processService.findOne(updateRevisionRequestDto.processId);
    }

    return await this.revisionRequestRepository.update(
      id,
      updateRevisionRequestDto,
    );
  }

  async remove(id: number) {
    const revisionRequest = await this.findOne(id);
    return await this.revisionRequestRepository.remove(revisionRequest);
  }
}
