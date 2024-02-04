import { OmitType } from '@nestjs/mapped-types';
import { ProcessFilterDto } from './process-filter.dto';
import { IsEmpty } from 'class-validator';

export class ReportFilterDto extends OmitType(ProcessFilterDto, [
  'withCategory',
]) {
  @IsEmpty({ message: 'Trazer dados de categoria é vazio.' })
  withCategory: string;
}
