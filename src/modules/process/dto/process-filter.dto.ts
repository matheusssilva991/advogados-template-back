import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProcessFilterDto {
  @IsString({ message: 'Chave do processo deve ser uma string.' })
  @IsOptional({ message: 'Chave do processo é opcional.' })
  processKey?: string;

  @IsOptional({ message: 'Nome do cliente é opcional.' })
  @IsString({ message: 'Nome do cliente deve ser uma string.' })
  name?: string;

  @IsString({ message: 'Assunto do processo deve ser uma string.' })
  @IsOptional({ message: 'Assunto do processo é opcional.' })
  matter?: string;

  @IsString({ message: 'Descrição do processo deve ser uma string.' })
  @IsOptional({ message: 'Descrição do processo é opcional.' })
  description?: string;

  @IsDate({ message: 'Data de distribuição inicial deve ser uma data.' })
  @IsOptional({ message: 'Data de distribuição inicial é opcional.' })
  @Type(() => Date)
  beginningDistributionDate?: Date;

  @IsDate({ message: 'Data de distribuição final deve ser uma data.' })
  @IsOptional({ message: 'Data de distribuição final é opcional.' })
  @Type(() => Date)
  endDistributionDate?: Date;

  @IsDate({ message: 'Data de conclusão inicial deve ser uma data.' })
  @IsOptional({ message: 'Data de conclusão inicial é opcional.' })
  @Type(() => Date)
  beginningConclusionDate?: Date;

  @IsDate({ message: 'Data de conclusão final deve ser uma data.' })
  @IsOptional({ message: 'Data de conclusão final é opcional.' })
  @Type(() => Date)
  endConclusionDate?: Date;

  @IsDate({ message: 'Data limite inicial deve ser uma data.' })
  @IsOptional({ message: 'Data limite inicial é opcional.' })
  @Type(() => Date)
  beginningDeadline?: Date;

  @IsDate({ message: 'Data limite final deve ser uma data.' })
  @IsOptional({ message: 'Data limite final é opcional.' })
  @Type(() => Date)
  endDeadline?: Date;

  @IsOptional({ message: 'Status é opcional.' })
  @IsString({ message: 'Status deve ser uma string.' })
  status?: string;

  @IsOptional({ message: 'Processo urgente é opcional.' })
  @IsNumber({}, { message: 'Processo urgente deve ser um número.' })
  @Type(() => Number)
  isUrgent?: number;

  @IsOptional({ message: 'Usuário é opcional.' })
  @IsNumber({}, { message: 'Usuário deve ser um número.' })
  @IsPositive({ message: 'Usuário deve ser positivo.' })
  @Type(() => Number)
  user: number;

  @IsOptional({ message: 'Categoria é opcional.' })
  @IsNumber({}, { message: 'Categoria deve ser um número.' })
  @IsPositive({ message: 'Categoria deve ser positiva.' })
  @Type(() => Number)
  category: number;

  @IsOptional({ message: 'Trazer dados do usuário é opcional.' })
  @IsBooleanString({ message: 'Trazer dados do usuário deve ser um booleano.' })
  withUser: string;

  @IsOptional({ message: 'Trazer dados da categoria é opcional.' })
  @IsBooleanString({
    message: 'Trazer dados da categoria deve ser um booleano.',
  })
  withCategory: string;

  @IsOptional({ message: 'Limite é opcional.' })
  @IsNumber({}, { message: 'Limite deve ser um número.' })
  @IsPositive({ message: 'Limite deve ser positivo.' })
  @Type(() => Number)
  limit?: number;

  @IsOptional({ message: 'Página é opcional.' })
  @IsNumber({}, { message: 'Página deve ser um número.' })
  @IsPositive({ message: 'Página deve ser positiva.' })
  @Type(() => Number)
  page?: number;

  @IsOptional({ message: 'Ordenação é opcional.' })
  sort?: string;
}
