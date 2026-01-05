import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';

/**
 * Tipo que representa o token JWT retornado após autenticação
 */
export type TokenType = {
  accessToken: string;
};

/**
 * Tipo que representa o payload armazenado no token JWT
 * Contém as informações essenciais do usuário autenticado
 */
export type TokenPayload = {
  sub: number;      // ID do usuário (subject)
  name: string;     // Nome do usuário
  email: string;    // Email do usuário
  role: string;     // Papel/função do usuário (Admin, Lawyer, User)
};

/**
 * Serviço de Autenticação
 *
 * Responsável por:
 * - Validar credenciais de usuários (email e senha)
 * - Gerar tokens JWT para autenticação
 * - Verificar e decodificar tokens JWT
 * - Gerenciar o fluxo de login
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida as credenciais do usuário
   *
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns Objeto do usuário sem a senha
   * @throws BadRequestException se a senha estiver incorreta
   * @throws NotFoundException se o usuário não existir (do userService)
   */
  async validateUser(email: string, password: string): Promise<User> {
    // Busca o usuário pelo email
    const user = await this.userService.findOneByEmail(email);

    // Compara a senha fornecida com o hash armazenado no banco
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Senha incorreta.');
    }

    // Remove a senha do objeto de retorno por segurança
    delete user.password;
    return user;
  }

  /**
   * Cria um token JWT para o usuário autenticado
   *
   * @param user - Objeto do usuário
   * @returns Objeto contendo o token de acesso
   */
  async createToken(user: User): Promise<TokenType> {
    // Gera o token JWT com as informações do usuário
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,       // Subject: ID único do usuário
        name: user.name,
        email: user.email,
        role: user.role,    // Papel do usuário para controle de acesso
      },
      {
        // Define o tempo de expiração do token (em segundos)
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRATION),
      },
    );

    return { accessToken };
  }

  /**
   * Verifica e decodifica um token JWT
   *
   * @param token - Token JWT a ser verificado
   * @returns Payload decodificado do token
   * @throws BadRequestException se o token for inválido ou expirado
   */
  async checkToken(token: string): Promise<TokenPayload> {
    try {
      // Verifica a assinatura e validade do token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      return payload;
    } catch (error) {
      // Token inválido, expirado ou malformado
      throw new BadRequestException(error);
    }
  }

  /**
   * Realiza o processo completo de login
   *
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns Objeto contendo o token JWT
   * @throws BadRequestException se as credenciais forem inválidas
   */
  async login(email: string, password: string): Promise<TokenType> {
    // Valida as credenciais do usuário
    const user = await this.validateUser(email, password);

    // Gera e retorna o token de acesso
    return await this.createToken(user);
  }
}

