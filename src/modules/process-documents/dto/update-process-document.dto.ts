import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDocumentDto } from './create-process-document.dto';

export class UpdateProcessDocumentDto extends PartialType(
  CreateProcessDocumentDto,
) {}
