import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

export type TokenType = {
  accessToken: string;
};

export type TokenPayload = {
  sub: number;
  name: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    // Tenta encontrar o usuário pelo email
    const user = await this.userService.findOneByEmail(email);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Senha incorreta.');
    }

    // Remove a senha do objeto de retorno
    delete user.password;
    return user;
  }

  async createToken(user: User): Promise<TokenType> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION),
      },
    );

    return { accessToken };
  }

  async checkToken(token: string): Promise<TokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      return payload;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string): Promise<TokenType> {
    const user = await this.validateUser(email, password);

    return await this.createToken(user);
  }
}
