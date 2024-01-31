import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { Status } from '../../enum/status.enum';
import { CategoryService } from '../category/category.service';
import { SpecialtyFilterDto } from '../specialty/dto/specialty-filter.dto';
import { Specialty } from '../specialty/entities/specialty.entity';
import { SpecialtyService } from '../specialty/specialty.service';
import { UserService } from '../user/user.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { ProcessFilterDto } from './dto/process-filter.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from './entities/process.entity';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly specialtyService: SpecialtyService,
  ) {}

  async create(createProcessDto: CreateProcessDto) {
    // Verifica se a chave de processo já existe
    await this.processKeyAlreadyExists(createProcessDto.processKey);

    // Verifica se a categoria existe
    await this.categoryService.findOne(createProcessDto.categoryId);

    // Verifica se a data de distribuição é maior que a data limite
    if (createProcessDto.distributionDate && createProcessDto.deadline) {
      if (createProcessDto.distributionDate > createProcessDto.deadline) {
        throw new BadRequestException(
          'A data de distribuição deve ser menor que a data limite.',
        );
      }
    }

    // Verifica se não foi informado o ID do usuário e o status não é EmAguardo
    if (
      isNaN(createProcessDto.userId) &&
      createProcessDto?.status !== Status.EmAguardo
    ) {
      // Pega as especialidades da categoria
      const specialties = await this.specialtyService.findAllWithFilter({
        category: createProcessDto.categoryId,
      } as SpecialtyFilterDto);

      // Verifica se há especialidades para a categoria
      if (specialties.length === 0) {
        throw new BadRequestException(
          'Não há especialidades para a categoria.',
        );
      }

      // Se for urgente, pega o usuário com menos processos e maior especialidade
      if (createProcessDto.isUrgent === 1) {
        createProcessDto.userId =
          await this.getUserIdWithHighestSpecialty(specialties);
      } else {
        // Se não for urgente, pega o usuário com menos processos
        createProcessDto.userId = await this.getUserIdLessProcesses(
          specialties.map((specialty) => specialty.userId),
        );
      }
      // Atribui para o advogado informado
    } else if (createProcessDto?.status !== Status.EmAguardo) {
      await this.userService.findOne(createProcessDto.userId);
      // Se for Em Aguardo, atribui null
    } else {
      createProcessDto.userId = null;
    }

    const process = this.processRepository.create(createProcessDto);
    return await this.processRepository.save(process);
  }

  async findAll() {
    return await this.processRepository.find();
  }

  async findAllWithFilter(query: ProcessFilterDto) {
    const { beginningDistributionDate, endDistributionDate } = query;
    const { beginningConclusionDate, endConclusionDate } = query;
    const { beginningDeadline, endDeadline } = query;
    const relations = [];

    const distributionDateInterval = this.getDateInterval(
      'distributionDate',
      beginningDistributionDate,
      endDistributionDate,
    );

    const conclusionDateInterval = this.getDateInterval(
      'conclusionDate',
      beginningConclusionDate,
      endConclusionDate,
    );

    const deadlineInterval = this.getDateInterval(
      'deadline',
      beginningDeadline,
      endDeadline,
    );

    // Trazer dados do usuário e/ou categoria junto com a especialidade
    query.withUser === 'true' && relations.push('user');
    query.withCategory === 'true' && relations.push('category');

    const filter = {
      ...(query.processKey && {
        processKey: ILike(`%${query.processKey}%`),
      }),
      ...(query.name && {
        name: ILike(`%${query.name}%`),
      }),
      ...(query.matter && {
        matter: ILike(`%${query.matter}%`),
      }),
      ...(query.information && {
        information: ILike(`%${query.information}%`),
      }),
      ...(query.isUrgent && {
        isUrgent: query.isUrgent,
      }),
      ...(query.status && {
        status: ILike(`%${query.status}%`),
      }),
      ...((beginningDistributionDate || endDistributionDate) &&
        distributionDateInterval),
      ...((beginningConclusionDate || endConclusionDate) &&
        conclusionDateInterval),
      ...((beginningDeadline || endDeadline) && deadlineInterval),
      ...(query.user && { userId: query.user }),
      ...(query.category && { categoryId: query.category }),
    };

    // Ordenação
    let sortObject: any;
    try {
      sortObject = JSON.parse(query.sort);
    } catch (error) {
      sortObject = { id: 'ASC' };
    }

    return await this.processRepository.find({
      where: filter,
      order: sortObject,
      take: query.limit || undefined,
      skip: (query.page - 1) * query.limit || 0,
      relations: relations,
    });
  }

  async findOne(id: number) {
    // Tenta encontrar a categoria pelo id
    try {
      return await this.processRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Processo não encontrado.');
    }
  }

  async update(id: number, updateProcessDto: UpdateProcessDto) {
    const process = await this.findOne(id);

    // Verifica se a chave de processo já existe
    if (
      updateProcessDto.processKey &&
      updateProcessDto.processKey !== process.processKey
    ) {
      await this.processKeyAlreadyExists(updateProcessDto.processKey);
    }

    // Verifica se a categoria existe
    if (updateProcessDto.categoryId) {
      await this.categoryService.findOne(updateProcessDto.categoryId);
    }

    // Verifica se a data de distribuição é maior que a data limite
    if (updateProcessDto.distributionDate && updateProcessDto.deadline) {
      if (updateProcessDto.distributionDate > updateProcessDto.deadline) {
        throw new BadRequestException(
          'A data de distribuição deve ser menor que a data limite.',
        );
      }
    }

    // Verifica se não foi informado o ID do usuário e o status não é EmAguardo
    if (updateProcessDto.userId) {
      if (isNaN(updateProcessDto.userId)) {
        throw new BadRequestException('O ID do usuário deve ser um número.');
      } else {
        await this.userService.findOne(updateProcessDto.userId);

        if (process.status === Status.EmAguardo) {
          updateProcessDto.status = Status.NaoVisualizado;
        }
      }
    } else if (
      updateProcessDto?.status !== Status.EmAguardo &&
      process.status === Status.EmAguardo
    ) {
      // Pegar todas as especialidades da categoria
      const specialties = await this.specialtyService.findAllWithFilter({
        category: updateProcessDto.categoryId,
      } as SpecialtyFilterDto);

      // Se não houver especialidades para a categoria
      if (specialties.length === 0) {
        throw new NotFoundException(
          'Não há especialidades cadastradas para a categoria selecionada.',
        );
      }

      if (!updateProcessDto.distributionDate) {
        updateProcessDto.distributionDate = new Date();
      }

      // Se for urgente, pega o usuário com menos processos e maior especialidade
      if (updateProcessDto.isUrgent === 1) {
        updateProcessDto.userId =
          await this.getUserIdWithHighestSpecialty(specialties);
      } else {
        // Se não for urgente, pega o usuário com menos processos
        updateProcessDto.userId = await this.getUserIdLessProcesses(
          specialties.map((specialty) => specialty.userId),
        );
      }

      return await this.processRepository.update(id, updateProcessDto);
    }
  }

  async updateMany(ids: number[]) {
    let count = 0;

    for (const id of ids) {
      await this.findOne(id);

      await this.update(id, {
        status: Status.NaoVisualizado,
      });

      count++;
    }

    return { updated: count };
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.processRepository.delete(id);
  }

  async removeMany(ids: number[]) {
    // Verifica se os processos existem
    for (const id of ids) {
      await this.findOne(id);
    }

    return await this.processRepository.delete(ids);
  }

  async processKeyAlreadyExists(processKey: string) {
    if (!processKey) {
      throw new BadRequestException('Chave de processo não informada.');
    }

    const process = await this.processRepository.findOne({
      where: { processKey },
    });

    if (process) {
      throw new BadRequestException('Chave de processo já cadastrada.');
    }
  }

  async getUserIdLessProcesses(ids: number[]) {
    let numProcesses = Infinity;
    let userId = -1;

    for (const id of ids) {
      const currentNumprocesses = await this.processRepository.count({
        where: {
          userId: id,
          status: Not(Status.Concluido),
        },
      });

      if (currentNumprocesses < numProcesses) {
        numProcesses = currentNumprocesses;
        userId = id;
      }
    }

    return userId;
  }

  async getUserIdWithHighestSpecialty(specialties: Specialty[]) {
    const highestSpecialty = specialties.reduce((prev, current) =>
      prev.affinity > current.affinity ? prev : current,
    );

    const usersWithHighestSpecialty = specialties.filter((specialty) => {
      return specialty.affinity === highestSpecialty.affinity;
    });

    // Se houver apenas um usuário com a maior especialidade, atribui o processo a ele
    if (usersWithHighestSpecialty.length === 1) {
      return usersWithHighestSpecialty[0].userId;

      // Se houver mais de um usuário com a maior especialidade, pega o que tem menos processos
    } else {
      const userId = await this.getUserIdLessProcesses(
        usersWithHighestSpecialty.map((specialty) => specialty.userId),
      );
      return userId;
    }
  }

  getDateInterval(name: string, beginning: Date, end: Date) {
    const queryObject: any = {};

    if (beginning > end) {
      const tmp = end;
      end = beginning;
      beginning = tmp;
    }

    if (beginning && end) {
      beginning = new Date(beginning.setDate(beginning.getDate()));
      end = new Date(end.setDate(end.getDate() + 1));
      queryObject[name] = Between(beginning, end);
    } else if (beginning) {
      beginning = new Date(beginning.setDate(beginning.getDate()));
      queryObject[name] = MoreThan(beginning);
    } else if (end) {
      end = new Date(end.setDate(end.getDate() + 1));
      queryObject[name] = LessThan(end);
    }

    return queryObject;
  }
}
