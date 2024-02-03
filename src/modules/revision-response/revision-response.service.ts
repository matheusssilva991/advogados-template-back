import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RevisionRequestService } from '../revision-request/revision-request.service';
import { UserService } from '../user/user.service';
import { CreateRevisionResponseDto } from './dto/create-revision-response.dto';
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

  async create(createRevisionResponseDto: CreateRevisionResponseDto) {
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

  async findAll() {
    return await this.revisionResponseRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.revisionResponseRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`Resposta de revisão ${id} não encontrada.`);
    }
  }

  async update(
    id: number,
    updateRevisionResponseDto: UpdateRevisionResponseDto,
  ) {
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

  async remove(id: number) {
    const revisionResponse = await this.findOne(id);
    return await this.revisionResponseRepository.remove(revisionResponse);
  }
}
