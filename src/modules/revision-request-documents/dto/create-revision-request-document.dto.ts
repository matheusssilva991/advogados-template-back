import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateProcessDocumentDto } from './../../process-documents/dto/create-process-document.dto';

export class CreateRevisionRequestDocumentDto extends PickType(
  CreateProcessDocumentDto,
  [
    'file',
    'fileName',
    'contentLength',
    'contentType',
    'filePath',
    'createdAt',
    'updatedAt',
  ],
) {
  @IsNumber({}, { message: 'O id da revisão deve ser um número' })
  @IsPositive({ message: 'O id da revisão deve ser um número positivo' })
  @IsNotEmpty({ message: 'O id da revisão é obrigatório' })
  @Type(() => Number)
  revisionRequestId: number;
}
