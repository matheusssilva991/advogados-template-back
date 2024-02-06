import { PartialType } from '@nestjs/mapped-types';
import { CreateRevisionRequestDto } from './create-revision-request.dto';

export class UpdateRevisionRequestDto extends PartialType(
  CreateRevisionRequestDto,
) {}
