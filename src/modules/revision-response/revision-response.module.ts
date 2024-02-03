import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionRequestModule } from '../revision-request/revision-request.module';
import { UserModule } from '../user/user.module';
import { RevisionResponse } from './entities/revision-response.entity';
import { RevisionResponseController } from './revision-response.controller';
import { RevisionResponseService } from './revision-response.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RevisionResponse]),
    UserModule,
    RevisionRequestModule,
  ],
  controllers: [RevisionResponseController],
  providers: [RevisionResponseService],
  exports: [RevisionResponseService],
})
export class RevisionResponseModule {}
