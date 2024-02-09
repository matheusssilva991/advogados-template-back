import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import {
  Between,
  ILike,
  LessThan,
  MoreThan,
  Not,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';
import { Status } from '../../common/enums/status.enum';
import { CategoryService } from '../category/category.service';
import { SpecialtyFilterDto } from '../specialty/dto/specialty-filter.dto';
import { Specialty } from '../specialty/entities/specialty.entity';
import { SpecialtyService } from '../specialty/specialty.service';
import { UserService } from '../user/user.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { ProcessFilterDto } from './dto/process-filter.dto';
import { ReportFilterDto } from './dto/report-filter.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from './entities/process.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit-table');

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Process)
    private readonly processRepository: Repository<Process>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly specialtyService: SpecialtyService,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<Process> {
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

  async findAll(): Promise<Process[]> {
    return await this.processRepository.find();
  }

  async findAllWithFilter(query: ProcessFilterDto): Promise<Process[]> {
    const { beginningDistributionDate, endDistributionDate } = query;
    const { beginningConclusionDate, endConclusionDate } = query;
    const { beginningDeadline, endDeadline } = query;
    const relations = [];

    const distributionDateInterval = this.getDateIntervalQuery(
      'distributionDate',
      beginningDistributionDate,
      endDistributionDate,
    );

    const conclusionDateInterval = this.getDateIntervalQuery(
      'conclusionDate',
      beginningConclusionDate,
      endConclusionDate,
    );

    const deadlineInterval = this.getDateIntervalQuery(
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
      ...(query.description && {
        description: ILike(`%${query.description}%`),
      }),
      ...(query.isUrgent && {
        isUrgent: query.isUrgent,
      }),
      ...(query.status && {
        status: ILike(`%${query.status}%`),
      }),
      ...(query.legalOpinion && {
        legalOpinion: ILike(`%${query.legalOpinion}%`),
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

  async findOne(id: number): Promise<Process> {
    // Tenta encontrar a categoria pelo id
    try {
      return await this.processRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Processo ${id} não encontrado.`);
    }
  }

  async update(
    id: number,
    updateProcessDto: UpdateProcessDto,
  ): Promise<UpdateResult> {
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
      console.log(2, updateProcessDto);
      if (isNaN(updateProcessDto.userId)) {
        throw new BadRequestException('O ID do usuário deve ser um número.');
      } else {
        await this.userService.findOne(updateProcessDto.userId);

        if (process.status === Status.EmAguardo) {
          updateProcessDto.status = Status.NaoVisualizado;
        }
      }
    } else if (
      updateProcessDto.status &&
      updateProcessDto.status !== Status.EmAguardo &&
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
    } else if (
      updateProcessDto.status &&
      updateProcessDto.status === Status.EmAguardo
    ) {
      updateProcessDto.userId = null;
    }

    return await this.processRepository.update(id, updateProcessDto);
  }

  async updateMany(ids: number[]): Promise<object> {
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

  async remove(id: number): Promise<Process> {
    const process = await this.findOne(id);
    return await this.processRepository.remove(process);
  }

  async removeMany(ids: number[]): Promise<object> {
    // Verifica se os processos existem
    const count = ids.length;
    for (const id of ids) {
      await this.remove(id);
    }
    return { removed: count };
  }

  async processKeyAlreadyExists(processKey: string): Promise<void> {
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

  async getUserIdLessProcesses(ids: number[]): Promise<number> {
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

  async getUserIdWithHighestSpecialty(
    specialties: Specialty[],
  ): Promise<number> {
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

  async generatePDF(query: ReportFilterDto): Promise<Buffer> {
    const { withUser } = query;
    query.withUser = 'true';
    query.withCategory = 'true';

    // Pega os processos e transforma em um array de objetos
    const processes = await this.findAllWithFilter(query as ProcessFilterDto);
    const processes_list = processes.map((process) => {
      return [
        process.user?.name || ' ',
        process.name || ' ',
        process.processKey || ' ',
        process.matter || ' ',
        this.formatDate(process.conclusionDate) || ' ',
        this.formatDate(process.deadline) || ' ',
        process.legalOpinion || ' ',
      ];
    });

    // Cria o header do PDF
    const headers = [
      'Advogado',
      'Cliente',
      'Processo',
      'Matéria',
      'Conclusão',
      'Prazo',
      'Parecer',
    ];

    // Remove o advogado da lista de processos
    if (!withUser) {
      processes_list.forEach((process) => {
        process.shift();
      });
      headers.shift();
    }

    // Cria o buffer do PDF
    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
        autoFirstPage: false,
      });

      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;

        const bottom = doc.page.margins.bottom;

        if (pageNumber > 1) {
          doc.image(
            join(process.cwd(), 'assets/scaleIcon.png'),
            doc.page.width - 100,
            5,
            { fit: [45, 45], align: 'center' },
          );
          doc
            .moveTo(50, 55)
            .lineTo(doc.page.width - 50, 55)
            .stroke();

          doc.page.margins.bottom = 0;
          doc.font('Helvetica').fontSize(14);
          doc.text(
            pageNumber,
            1.0 * (doc.page.width - 100),
            doc.page.height - 50,
            {
              width: 100,
              align: 'center',
              lineBreak: false,
            },
          );
          doc.page.margins.bottom = bottom;
        }
      });

      doc.addPage();
      doc.image(
        join(process.cwd(), 'assets/scaleIcon.png'),
        doc.page.width / 2 - 100,
        150,
        { width: 200 },
      );
      doc.text('', 0, 400);
      doc.font('Helvetica-Bold').fontSize(24);
      doc.text('Relatório de Processos', {
        width: doc.page.width,
        align: 'center',
      });
      doc.moveDown(3);

      query['distributionDate'] = this.getDateInterval(
        query.beginningDistributionDate,
        query.endDistributionDate,
      );

      query['conclusionDate'] = this.getDateInterval(
        query.beginningConclusionDate,
        query.endConclusionDate,
      );

      query['deadline'] = this.getDateInterval(
        query.beginningDeadline,
        query.endDeadline,
      );

      let yPosition = 550;
      for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
          const element = query[key];
          if (element) {
            let text = '';
            if (key == 'processKey') {
              text = `Processo: ${element}`;
            } else if (key == 'name') {
              text = `Cliente: ${element}`;
            } else if (key == 'matter') {
              text = `Matéria: ${element}`;
            } else if (key == 'description') {
              text = `Descrição: ${element}`;
            } else if (key == 'user') {
              text = `Advogado: ${processes[0].user?.name}`;
            } else if (key == 'category') {
              text = `Área: ${processes[0].category?.name}`;
            } else if (key == 'distributionDate') {
              text = `Data de distruibuição: ${element}`;
            } else if (key == 'conclusionDate') {
              text = `Data de conclusão: ${element}`;
            } else if (key == 'Período') {
              text = `Prazo: ${element}`;
            } else if (key == 'status') {
              text = `Status: ${element}`;
            } else if (key == 'legalOpinion') {
              text = `Parecer: ${element}`;
            } else {
              continue;
            }

            doc.font('Helvetica').fontSize(12);
            let textWidth = doc.widthOfString(text); // Calcula a largura do texto
            if (textWidth > doc.page.width - 100) {
              // Se a largura do texto for maior que a largura da página, reduza o tamanho da fonte
              doc.fontSize(10);
              textWidth = doc.widthOfString(text); // Recalcule a largura do texto
            }

            if (textWidth < 120) {
              textWidth = 120;
            } else if (
              key === 'user' ||
              key === 'description' ||
              key === 'matter' ||
              key === 'legalOpinion'
            ) {
              textWidth = 300;
            }

            const centerX = doc.page.width / 2 - textWidth / 2; // Calcula a posição X centralizada
            doc.text(text, centerX, yPosition, {
              // Use centerX para posicionar o texto centralizado
              width: textWidth, // Defina a largura com base na largura do texto
              align: 'center',
              break: false,
            });

            yPosition += 25;
          }
        }
      }

      doc.addPage();
      doc.text('', 50, 100);
      doc.font('Helvetica').fontSize(24);
      doc.text('Lista de processos', {
        width: doc.page.width - 100,
        align: 'center',
      });
      doc.moveDown();

      const table = {
        headers: headers,
        rows: processes_list,
      };

      doc.table(table);

      const buffer: any[] = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffer);
        resolve(pdfData);
      });
      doc.on('error', reject);
      doc.end();
    });

    return pdfBuffer;
  }

  getDateIntervalQuery(name: string, beginning: Date, end: Date): object {
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

  formatDate(date: any): any {
    try {
      if (!date) {
        return ' ';
      }

      if (typeof date === 'string') {
        date = new Date(date);
      }

      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      const returnDate = date.toLocaleDateString('pt-BR', options);

      if (returnDate === 'Invalid Date') {
        return ' ';
      }

      return returnDate;
    } catch (error) {
      return ' ';
    }
  }

  getDateInterval(beginningDate: Date, endDate: Date): string {
    if (beginningDate && endDate) {
      beginningDate = this.formatDate(beginningDate);
      endDate = this.formatDate(endDate);
      return `${beginningDate}-${endDate}`;
    } else if (beginningDate) {
      beginningDate = this.formatDate(beginningDate);
      return `${beginningDate}- `;
    } else if (endDate) {
      endDate = this.formatDate(endDate);
      return ` -${endDate}`;
    } else return undefined;
  }

  async getReportFilterValues(): Promise<object> {
    // Obtenha categorias e usuários
    const [categories, users] = await Promise.all([
      this.categoryService.findAll(),
      this.userService.findAll(),
    ]);

    // Obtenha processos
    const processes = await this.findAll();

    // Extraia valores exclusivos de clientes, matérias e prazos
    const customers = [...new Set(processes.map((process) => process.name))];
    const materias = [...new Set(processes.map((process) => process.matter))];
    const deadlines = [
      ...new Set(processes.map((process) => this.formatDate(process.deadline))),
    ];

    // Filtrar usuários com função diferente de "Admin"
    const filteredUsers = users.filter((user) => user.role !== Role.admin);

    return {
      categories,
      users: filteredUsers,
      customers,
      materias,
      deadlines,
    };
  }
}
