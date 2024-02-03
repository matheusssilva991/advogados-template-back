import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Informe um nome válido.' })
  @IsNotEmpty({ message: 'Informe um nome.' })
  name: string;

  @IsEmpty({ message: 'O campo createdAt não deve ser preenchido.' })
  createdAt: Date;

  @IsEmpty({ message: 'O campo updatedAt não deve ser preenchido.' })
  updatedAt: Date;
}
