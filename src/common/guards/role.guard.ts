import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

/**
 * Guard de Autorização por Roles (Papéis)
 *
 * Responsável por:
 * - Verificar se o usuário possui um dos papéis necessários para acessar a rota
 * - Extrair os papéis requeridos dos metadados da rota (via decorator @Roles)
 * - Comparar o papel do usuário autenticado com os papéis permitidos
 *
 * Uso:
 * @Roles(Role.admin, Role.lawyer)
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * async minhaRota() { ... }
 *
 * Nota: Este guard deve ser usado após o JwtAuthGuard para garantir
 * que o usuário está autenticado antes de verificar suas permissões.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Valida se o usuário possui permissão para acessar o recurso
   *
   * @param context - Contexto de execução da requisição
   * @returns true se o usuário tem permissão, lança exceção caso contrário
   * @throws UnauthorizedException se o usuário não tiver o papel necessário
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extrai os papéis requeridos dos metadados da rota e da classe
    // Busca primeiro no handler (método), depois na classe (controller)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não há papéis definidos, permite acesso (rota pública após auth)
    if (!requiredRoles) {
      return true;
    }

    // Obtém o usuário autenticado anexado à requisição pelo JwtAuthGuard
    const { user } = context.switchToHttp().getRequest();

    // Filtra os papéis que correspondem ao papel do usuário
    const rolesFilted = requiredRoles.filter((role) => role === user.role);

    // Se nenhum papel corresponder, usuário não tem permissão
    if (rolesFilted.length === 0) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    // Retorna true se ao menos um papel corresponder
    return rolesFilted.length > 0;
  }
}
