import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class SpecialtyFilterDto {
  @IsOptional({ message: 'Usuário é opcional.' })
  @IsNumberString({}, { message: 'Usuário deve ser um número.' })
  user: number;

  @IsOptional({ message: 'Categoria é opcional.' })
  @IsNumber({}, { message: 'Categoria deve ser um número.' })
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
  limit: number;

  @IsOptional({ message: 'Página é opcional.' })
  @IsNumber({}, { message: 'Página deve ser um número.' })
  @IsPositive({ message: 'Página deve ser positiva.' })
  @Type(() => Number)
  page: number;

  @IsOptional({ message: 'Ordenação é opcional.' })
  sort: string;
}
