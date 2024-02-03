import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { RevisionRequestFilterDto } from './../../revision-request/dto/revision-request-filter.dto';

export class RevisionResponseFilterDto extends PickType(
  RevisionRequestFilterDto,
  ['title', 'description', 'limit', 'page', 'sort'],
) {
  @IsOptional({ message: 'Processo é opcional.' })
  @IsNumber({}, { message: 'Processo deve ser um número.' })
  @IsPositive({ message: 'ID do processo deve ser positivo.' })
  @Type(() => Number)
  process: number;

  @IsOptional({ message: 'Requisição de revisão é opcional.' })
  @IsNumber({}, { message: 'Requisição de revisão deve ser um número.' })
  @IsPositive({ message: 'ID da requisição de revisão deve ser positivo.' })
  @Type(() => Number)
  revisionRequest: number;

  @IsOptional({ message: 'Trazer dados da requisição de revisão é opcional.' })
  @IsBooleanString({
    message: 'Trazer dados da requisição de revisão deve ser um booleano.',
  })
  withRequest: string;

  @IsOptional({ message: 'Usuário é opcional.' })
  @IsNumber({}, { message: 'Usuário deve ser um número.' })
  @IsPositive({ message: 'ID do usuário deve ser positivo.' })
  @Type(() => Number)
  user: number;

  @IsOptional({ message: 'Trazer dados do usuário é opcional.' })
  @IsBooleanString({
    message: 'Trazer dados do usuário deve ser um booleano.',
  })
  withUser: string;
}
