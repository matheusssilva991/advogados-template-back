import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { RevisionResponseModule } from '../revision-response/revision-response.module';
import { RevisionResponseDocument } from './entities/revision-response-document.entity';
import { RevisionResponseDocumentsController } from './revision-response-documents.controller';
import { RevisionResponseDocumentsService } from './revision-response-documents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RevisionResponseDocument]),
    RevisionResponseModule,
    FileModule,
    AuthModule,
  ],
  controllers: [RevisionResponseDocumentsController],
  providers: [RevisionResponseDocumentsService],
  exports: [RevisionResponseDocumentsService],
})
export class RevisionResponseDocumentsModule {}
