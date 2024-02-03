import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateRevisionRequestDto } from './../../revision-request/dto/create-revision-request.dto';

export class CreateRevisionResponseDto extends PickType(
  CreateRevisionRequestDto,
  ['title', 'description', 'createdAt', 'updatedAt'],
) {
  @IsNumber(
    {},
    { message: 'O id da solicitação de revisão deve ser um número.' },
  )
  @IsNotEmpty({ message: 'O id da solicitação de revisão é obrigatório.' })
  revisionRequestId: number;

  @IsNumber({}, { message: 'O id do usuário deve ser um número.' })
  @IsNotEmpty({ message: 'O id do usuário é obrigatório.' })
  userId: number;
}
