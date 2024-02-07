import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { ProcessModule } from '../process/process.module';
import { UserModule } from '../user/user.module';
import { ProcessDocument } from './entities/process-document.entity';
import { ProcessDocumentsController } from './process-documents.controller';
import { ProcessDocumentsService } from './process-documents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProcessDocument]),
    ProcessModule,
    FileModule,
    AuthModule,
    UserModule,
  ],
  controllers: [ProcessDocumentsController],
  providers: [ProcessDocumentsService],
  exports: [ProcessDocumentsService],
})
export class ProcessDocumentsModule {}
