import { PartialType } from '@nestjs/mapped-types';
import { CreateRevisionResponseDto } from './create-revision-response.dto';

export class UpdateRevisionResponseDto extends PartialType(
  CreateRevisionResponseDto,
) {}
