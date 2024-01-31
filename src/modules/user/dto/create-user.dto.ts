import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '../../../enum/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @IsString({ message: 'Nome deve ser uma string.' })
  name: string;

  @IsNotEmpty({ message: 'Email é obrigatório.' })
  @IsEmail({ allow_display_name: true }, { message: 'Email inválido.' })
  email: string;

  @IsOptional({ message: 'Telefone é opcional.' })
  @IsPhoneNumber('BR', { message: 'Telefone inválido.' })
  phoneNumber?: string;

  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    { message: 'Senha fraca.' },
  )
  password: string;

  @IsOptional({ message: 'Número da OAB é opcional.' })
  @IsString({ message: 'Número da OAB deve ser uma string.' })
  nroOAB?: string;

  @IsOptional({ message: 'Função é opcional.' })
  @IsEnum(Role, { message: 'Função inválida.' })
  role?: Role;

  @IsEmpty()
  createdAt: Date;

  @IsEmpty()
  updatedAt: Date;
}
