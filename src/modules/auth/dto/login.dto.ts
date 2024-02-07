import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido.' })
  @IsNotEmpty({ message: 'Email é obrigatório.' })
  email: string;

  @IsString({ message: 'Senha inválida.' })
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  password: string;
}
