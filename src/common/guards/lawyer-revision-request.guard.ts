import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ProcessService } from '../../modules/process/process.service';
import { RevisionRequestService } from '../../modules/revision-request/revision-request.service';
import { Role } from '../enums/role.enum';

export class LawyerRevisionRequestGuard implements CanActivate {
  constructor(
    @Inject(RevisionRequestService)
    private readonly revisionRequestService: RevisionRequestService,
    @Inject(ProcessService)
    private readonly processService: ProcessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica se o usuário é um advogado
    if (user.role === Role.admin) {
      throw new UnauthorizedException(
        'Somente advogados podem acessar este recurso.',
      );
    }

    if (request.method !== 'POST') {
      const revisionRequestId = Number(request.params.id);
      const revisionRequest =
        await this.revisionRequestService.findOne(revisionRequestId);
      const process = await this.processService.findOne(
        revisionRequest.processId,
      );

      if (process.userId !== user.id) {
        throw new UnauthorizedException(
          'Somente o advogado responsável pelo processo pode acessar este recurso.',
        );
      }
    }

    return true;
  }
}
