import { Type } from 'class-transformer';
import {
  IsOptional,
  IsBooleanString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class ProcessDocumentFilterDto {
  @IsOptional({ message: 'Processo é opcional.' })
  @IsNumber({}, { message: 'Processo deve ser um número.' })
  @IsPositive({ message: 'ID do processo deve ser positivo.' })
  @Type(() => Number)
  process: number;

  @IsOptional({ message: 'Trazer dados do processo é opcional.' })
  @IsBooleanString({
    message: 'Trazer dados do processo deve ser um booleano.',
  })
  withProcess: string;

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
