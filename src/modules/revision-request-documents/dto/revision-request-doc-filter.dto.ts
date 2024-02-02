import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class RevisionRequestDocFilterDto {
  @IsOptional({ message: 'Requisição de revisão é opcional.' })
  @IsNumber({}, { message: 'Requisição de revisão deve ser um número.' })
  @IsPositive({ message: 'ID do Requisição de revisão deve ser positivo.' })
  @Type(() => Number)
  revisionRequest: number;

  @IsOptional({ message: 'Trazer dados da requisição de revisão é opcional.' })
  @IsBooleanString({
    message: 'Trazer dados da requisição de revisão deve ser um booleano.',
  })
  withRevisionRequest: string;

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
