import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/auth.guard';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.login(email, password);

    response.cookie('accessToken', accessToken, {
      httpOnly: false,
      //maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRATION),
    });

    return {
      message: 'Usuário logado com sucesso.',
      accessToken,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('accessToken', undefined, { expires: new Date(0) });
    return {
      message: 'Usuário deslogado com sucesso.',
    };
  }
}
