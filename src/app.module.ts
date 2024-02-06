import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source.config';
import { CategoryModule } from './modules/category/category.module';
import { FileModule } from './modules/file/file.module';
import { ProcessDocumentsModule } from './modules/process-documents/process-documents.module';
import { ProcessModule } from './modules/process/process.module';
import { RevisionRequestDocumentsModule } from './modules/revision-request-documents/revision-request-documents.module';
import { RevisionRequestModule } from './modules/revision-request/revision-request.module';
import { RevisionResponseDocumentsModule } from './modules/revision-response-documents/revision-response-documents.module';
import { RevisionResponseModule } from './modules/revision-response/revision-response.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),
    UserModule,
    CategoryModule,
    SpecialtyModule,
    ProcessModule,
    ProcessDocumentsModule,
    FileModule,
    RevisionRequestModule,
    RevisionRequestDocumentsModule,
    RevisionResponseModule,
    RevisionResponseDocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
