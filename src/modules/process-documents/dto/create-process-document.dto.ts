import { Exclude, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProcessDocumentDto {
  @Exclude()
  file: Express.Multer.File;

  @IsString({ message: 'O nome do arquivo deve ser uma string' })
  @IsOptional({ message: 'O nome do arquivo é vazio' })
  fileName: string;

  @IsNumber({}, { message: 'O tamanho do arquivo deve ser um número' })
  @IsPositive({ message: 'O tamanho do arquivo deve ser um número positivo' })
  @IsOptional({ message: 'O tamanho do arquivo é vazio' })
  contentLength: number;

  @IsString({ message: 'O tipo do arquivo deve ser uma string' })
  @IsOptional({ message: 'O tipo do arquivo é vazio' })
  contentType: string;

  @IsString({ message: 'O caminho do arquivo deve ser uma string' })
  @IsOptional({ message: 'O caminho do arquivo é vazio' })
  filePath: string;

  @IsNumber({}, { message: 'O id do processo deve ser um número' })
  @IsPositive({ message: 'O id do processo deve ser um número positivo' })
  @IsNotEmpty({ message: 'O id do processo é obrigatório' })
  @Type(() => Number)
  processId: number;

  createdAt: Date;
  updatedAt: Date;
}
