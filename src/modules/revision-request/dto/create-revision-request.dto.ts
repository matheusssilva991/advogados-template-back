import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRevisionRequestDto {
  @IsString({ message: 'O título deve ser uma string.' })
  @IsNotEmpty({ message: 'O título é obrigatório.' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;

  @IsNumber({}, { message: 'O id do processo deve ser um número.' })
  @IsNotEmpty({ message: 'O id do processo é obrigatório.' })
  processId: number;

  @IsEmpty({ message: 'O campo createdAt não deve ser preenchido.' })
  createdAt: Date;

  @IsEmpty({ message: 'O campo updatedAt não deve ser preenchido.' })
  updatedAt: Date;
}
