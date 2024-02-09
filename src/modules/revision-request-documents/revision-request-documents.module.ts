import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { ProcessModule } from '../process/process.module';
import { RevisionRequestModule } from '../revision-request/revision-request.module';
import { UserModule } from '../user/user.module';
import { RevisionRequestDocument } from './entities/revision-request-document.entity';
import { RevisionRequestDocumentsController } from './revision-request-documents.controller';
import { RevisionRequestDocumentsService } from './revision-request-documents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RevisionRequestDocument]),
    RevisionRequestModule,
    FileModule,
    AuthModule,
    UserModule,
    ProcessModule,
  ],
  controllers: [RevisionRequestDocumentsController],
  providers: [RevisionRequestDocumentsService],
  exports: [RevisionRequestDocumentsService],
})
export class RevisionRequestDocumentsModule {}
