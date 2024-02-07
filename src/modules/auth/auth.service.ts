import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  async createToken(user: User) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        secret: process.env.SECRET_KEY,
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION),
      },
    );

    return { accessToken };
  }

  async checkToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    return await this.createToken(user);
  }
}
