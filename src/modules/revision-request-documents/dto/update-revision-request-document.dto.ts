import { PartialType } from '@nestjs/mapped-types';
import { CreateRevisionRequestDocumentDto } from './create-revision-request-document.dto';

export class UpdateRevisionRequestDocumentDto extends PartialType(
  CreateRevisionRequestDocumentDto,
) {}
