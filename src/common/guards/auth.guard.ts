import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserService } from 'src/modules/user/user.service';

/**
 * Guard de Autenticação JWT
 *
 * Responsável por:
 * - Extrair o token JWT dos cookies da requisição
 * - Validar a autenticidade e validade do token
 * - Buscar os dados completos do usuário no banco
 * - Anexar o usuário ao objeto da requisição para uso nos controllers
 *
 * Este guard deve ser aplicado em todas as rotas que requerem autenticação.
 * Ele trabalha em conjunto com a estratégia JWT do Passport.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  /**
   * Método de ativação do guard
   *
   * Processo de validação:
   * 1. Extrai o token JWT do cookie 'accessToken'
   * 2. Valida e decodifica o token usando AuthService
   * 3. Busca os dados completos do usuário no banco
   * 4. Anexa o usuário ao objeto request para uso posterior
   *
   * @param context - Contexto de execução que contém informações da requisição
   * @returns true se o usuário está autenticado, lança exceção caso contrário
   * @throws UnauthorizedException se o token estiver ausente, inválido ou expirado
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtém o objeto de requisição HTTP do contexto
    const request = context.switchToHttp().getRequest();

    // Extrai o token JWT do cookie 'accessToken'
    const token = request.cookies['accessToken'];

    try {
      // Valida o token e extrai o payload (contém o ID do usuário)
      const data = await this.authService.checkToken(token);

      // Busca os dados completos e atualizados do usuário no banco
      // Isso garante que informações como role e status estejam atualizadas
      request.user = await this.userService.findOne(data.sub);

      // Chama o guard padrão do Passport para validações adicionais
      super.canActivate(context);

      return true;
    } catch (err) {
      // Token ausente, inválido, expirado ou usuário não encontrado
      throw new UnauthorizedException('Token JWT ausente ou inválido');
    }
  }
}

