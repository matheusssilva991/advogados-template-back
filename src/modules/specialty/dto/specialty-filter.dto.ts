import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class SpecialtyFilterDto {
  @IsOptional({ message: 'Usuário é opcional.' })
  user: number;

  @IsOptional({ message: 'Categoria é opcional.' })
  category: number;

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
