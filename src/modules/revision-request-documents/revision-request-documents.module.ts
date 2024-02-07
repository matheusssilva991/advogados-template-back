import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { RevisionRequestModule } from '../revision-request/revision-request.module';
import { RevisionRequestDocument } from './entities/revision-request-document.entity';
import { RevisionRequestDocumentsController } from './revision-request-documents.controller';
import { RevisionRequestDocumentsService } from './revision-request-documents.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RevisionRequestDocument]),
    RevisionRequestModule,
    FileModule,
    AuthModule,
  ],
  controllers: [RevisionRequestDocumentsController],
  providers: [RevisionRequestDocumentsService],
  exports: [RevisionRequestDocumentsService],
})
export class RevisionRequestDocumentsModule {}
