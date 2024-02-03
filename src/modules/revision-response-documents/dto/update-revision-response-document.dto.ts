import { PartialType } from '@nestjs/mapped-types';
import { CreateRevisionResponseDocumentDto } from './create-revision-response-document.dto';

export class UpdateRevisionResponseDocumentDto extends PartialType(
  CreateRevisionResponseDocumentDto,
) {}
