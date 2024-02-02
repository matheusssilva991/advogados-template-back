import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessModule } from '../process/process.module';
import { ProcessDocument } from './entities/process-document.entity';
import { ProcessDocumentsController } from './process-documents.controller';
import { ProcessDocumentsService } from './process-documents.service';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessDocument]),
    forwardRef(() => ProcessModule),
    FileModule,
  ],
  controllers: [ProcessDocumentsController],
  providers: [ProcessDocumentsService],
  exports: [ProcessDocumentsService],
})
export class ProcessDocumentsModule {}
