import { IsEmpty, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateSpecialtyDto {
  @IsNotEmpty({ message: 'Nível de especialidade é obrigatória.' })
  @IsInt({ message: 'Nível de especialidade deve ser um número inteiro.' })
  @Min(0, { message: 'O número deve ser maior ou igual a 0.' })
  @Max(10, { message: 'O número deve ser menor ou igual a 2.' })
  affinity: number;

  @IsNotEmpty({ message: 'Id do advogado é obrigatório.' })
  @IsInt({ message: 'Id do advogado deve ser um número inteiro.' })
  userId: number;

  @IsNotEmpty({ message: 'Id da categoria é obrigatório.' })
  @IsInt({ message: 'Id da categoria deve ser um número inteiro.' })
  categoryId: number;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;
}
