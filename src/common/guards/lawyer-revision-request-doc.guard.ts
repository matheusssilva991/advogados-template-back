import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ProcessService } from '../../modules/process/process.service';
import { RevisionRequestDocumentsService } from '../../modules/revision-request-documents/revision-request-documents.service';
import { RevisionRequestService } from '../../modules/revision-request/revision-request.service';
import { Role } from '../enums/role.enum';

export class LawyerRevisionRequestDocGuard implements CanActivate {
  constructor(
    private readonly revisionRequestService: RevisionRequestService,
    private readonly revisionRequestDocumentService: RevisionRequestDocumentsService,
    private readonly processService: ProcessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const revisionRequestDocumentId = Number(request.params.id);
    const revisionRequestDocument =
      await this.revisionRequestDocumentService.findOne(
        revisionRequestDocumentId,
      );
    const revisionRequest = await this.revisionRequestService.findOne(
      revisionRequestDocument.revisionRequestId,
    );
    const process = await this.processService.findOne(
      revisionRequest.processId,
    );

    if (user.role === Role.admin) {
      throw new UnauthorizedException(
        'Somente advogados podem acessar este recurso.',
      );
    }

    if (process.userId !== user.sub) {
      throw new UnauthorizedException(
        'Somente o advogado responsável pelo processo pode acessar este recurso.',
      );
    }

    return true;
  }
}
