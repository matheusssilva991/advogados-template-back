import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProcessModule } from '../process/process.module';
import { RevisionRequest } from './entities/revision-request.entity';
import { RevisionRequestController } from './revision-request.controller';
import { RevisionRequestService } from './revision-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RevisionRequest]),
    ProcessModule,
    AuthModule,
  ],
  controllers: [RevisionRequestController],
  providers: [RevisionRequestService],
  exports: [RevisionRequestService],
})
export class RevisionRequestModule {}
