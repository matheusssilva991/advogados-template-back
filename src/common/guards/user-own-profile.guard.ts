import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../enums/role.enum';

export class UserOwnProfileGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = Number(request.params.id);
    const user = request.user;

    if (user.role !== Role.admin) {
      if (request.body) {
        request.body.role = undefined;
      }

      if (user.sub !== id) {
        throw new UnauthorizedException(
          'Você não tem permissão para acessar este recurso.',
        );
      }
    }

    return true;
  }
}
