import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { RevisionRequestService } from '../revision-request/revision-request.service';
import { UserService } from '../user/user.service';
import { CreateRevisionResponseDto } from './dto/create-revision-response.dto';
import { RevisionResponseFilterDto } from './dto/revision-response-filter.dto';
import { UpdateRevisionResponseDto } from './dto/update-revision-response.dto';
import { RevisionResponse } from './entities/revision-response.entity';

@Injectable()
export class RevisionResponseService {
  constructor(
    @InjectRepository(RevisionResponse)
    private revisionResponseRepository: Repository<RevisionResponse>,
    private readonly revisionRequestService: RevisionRequestService,
    private readonly userService: UserService,
  ) {}

  async create(
    createRevisionResponseDto: CreateRevisionResponseDto,
  ): Promise<RevisionResponse> {
    // Verifica se a requisição de revisão existe
    await this.revisionRequestService.findOne(
      createRevisionResponseDto.revisionRequestId,
    );

    // Verifica se o usuário existe
    await this.userService.findOne(createRevisionResponseDto.userId);

    const revisionResponse = this.revisionResponseRepository.create(
      createRevisionResponseDto,
    );

    return await this.revisionResponseRepository.save(revisionResponse);
  }

  async findAll(): Promise<RevisionResponse[]> {
    return await this.revisionResponseRepository.find();
  }

  async findAllWithFilter(
    query: RevisionResponseFilterDto,
  ): Promise<RevisionResponse[]> {
    const relations = [];

    // Trazer dados do processo
    query.withUser === 'true' && relations.push('process');
    query.withRequest === 'true' && relations.push('revision_request');

    const filter = {
      ...(query.title && {
        title: ILike(`%${query.title}%`),
      }),
      ...(query.description && {
        description: ILike(`%${query.description}%`),
      }),
      ...(query.process && { revisionRequest: { processId: query.process } }),
      ...(query.revisionRequest && {
        revisionRequestId: query.revisionRequest,
      }),
      ...(query.user && { userId: query.user }),
    };

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.revisionResponseRepository.find({
      where: filter,
      order: sortObject,
      take: query.limit || undefined,
      skip: (query.page - 1) * query.limit || 0,
      relations: relations,
    });
  }

  async findOne(id: number): Promise<RevisionResponse> {
    try {
      return await this.revisionResponseRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`Resposta de revisão ${id} não encontrada.`);
    }
  }

  async update(
    id: number,
    updateRevisionResponseDto: UpdateRevisionResponseDto,
  ): Promise<UpdateResult> {
    // Verifica se a resposta de revisão existe
    await this.findOne(id);

    // Verifica se a requisição de revisão existe
    if (updateRevisionResponseDto.revisionRequestId) {
      await this.revisionRequestService.findOne(
        updateRevisionResponseDto.revisionRequestId,
      );
    }

    // Verifica se o usuário existe
    if (updateRevisionResponseDto.userId) {
      await this.userService.findOne(updateRevisionResponseDto.userId);
    }

    return await this.revisionResponseRepository.update(
      id,
      updateRevisionResponseDto,
    );
  }

  async remove(id: number): Promise<RevisionResponse> {
    const revisionResponse = await this.findOne(id);
    return await this.revisionResponseRepository.remove(revisionResponse);
  }
}
