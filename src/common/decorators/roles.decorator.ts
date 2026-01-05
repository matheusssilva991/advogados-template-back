import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

/**
 * Chave usada para armazenar e recuperar metadados de roles
 * Utilizada pelo RolesGuard para verificar permissões
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator customizado para definir papéis (roles) permitidos em uma rota
 *
 * Este decorator marca rotas ou controllers com os papéis necessários
 * para acessá-los. Trabalha em conjunto com o RolesGuard.
 *
 * @param roles - Lista de papéis permitidos (Role.admin, Role.lawyer, etc)
 * @returns Decorator que anexa os roles aos metadados da rota
 *
 * Exemplo de uso:
 * @Roles(Role.admin)  // Apenas administradores
 * @Roles(Role.admin, Role.lawyer)  // Administradores ou advogados
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * async deleteUser() { ... }
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
