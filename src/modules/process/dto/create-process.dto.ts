import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Status } from '../../../common/enum/status.enum';

export class CreateProcessDto {
  @IsString({ message: 'Chave do processo deve ser uma string.' })
  @IsNotEmpty({ message: 'Chave do processo é obrigatória.' })
  processKey: string;

  @IsString({ message: 'Nome do cliente deve ser uma string.' })
  @IsOptional({ message: 'Nome do cliente é opcional.' })
  name?: string;

  @IsString({ message: 'Assunto do processo deve ser uma string.' })
  @IsOptional({ message: 'Assunto do processo é opcional.' })
  matter?: string;

  @IsString({ message: 'Descrição do processo deve ser uma string.' })
  @IsOptional({ message: 'Descrição do processo é opcional.' })
  description?: string;

  @IsDate({ message: 'Data de distribuição deve ser uma data.' })
  @IsOptional({ message: 'Data de distribuição é opcional.' })
  @Type(() => Date)
  distributionDate?: Date;

  @IsDate({ message: 'Data de conclusão deve ser uma data.' })
  @IsOptional({ message: 'Data de conclusão é opcional.' })
  @Type(() => Date)
  conclusionDate?: Date;

  @IsDate({ message: 'Data limite deve ser uma data.' })
  @IsOptional({ message: 'Data limite é opcional.' })
  @Type(() => Date)
  deadline?: Date;

  @IsEnum(Status)
  @IsOptional({ message: 'Status é opcional.' })
  status?: string;

  @IsOptional({ message: 'Processo urgente é opcional.' })
  @IsNumber({}, { message: 'Processo urgente deve ser um número.' })
  @Min(0, { message: 'Processo urgente deve ser 0 ou 1.' })
  @Max(1, { message: 'Processo urgente deve ser 0 ou 1.' })
  isUrgent?: number;

  @IsString({ message: 'Parecer deve ser uma string.' })
  @IsOptional({ message: 'Parecer é opcional.' })
  legalOpinion?: string;

  @IsNumber({}, { message: 'ID do usuário deve ser um número.' })
  @IsPositive({ message: 'ID do usuário deve ser um número positivo.' })
  @IsOptional({ message: 'ID do usuário é opcional.' })
  userId: number;

  @IsNumber({}, { message: 'ID da categoria deve ser um número.' })
  @IsPositive({ message: 'ID da categoria deve ser um número positivo.' })
  @IsNotEmpty({ message: 'ID da categoria é obrigatório.' })
  categoryId: number;

  @IsEmpty({ message: 'O campo createdAt não deve ser preenchido.' })
  createdAt: Date;

  @IsEmpty({ message: 'O campo updatedAt não deve ser preenchido.' })
  updatedAt: Date;
}
