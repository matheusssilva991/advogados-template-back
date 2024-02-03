import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class RevisionResponseDocFilterDto {
  @IsOptional({ message: 'Resposta de revisão é opcional.' })
  @IsNumber({}, { message: 'Resposta de revisão deve ser um número.' })
  @IsPositive({ message: 'ID da Resposta de revisão deve ser positivo.' })
  @Type(() => Number)
  revisionResponse: number;

  @IsOptional({ message: 'Trazer dados da resposta de revisão é opcional.' })
  @IsBooleanString({
    message: 'Trazer dados da resposta de revisão deve ser um booleano.',
  })
  withRevisionResponse: string;

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
