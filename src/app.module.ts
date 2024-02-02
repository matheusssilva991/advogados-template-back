import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source.config';
import { CategoryModule } from './modules/category/category.module';
import { ProcessDocumentsModule } from './modules/process-documents/process-documents.module';
import { ProcessModule } from './modules/process/process.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    CategoryModule,
    SpecialtyModule,
    ProcessModule,
    ProcessDocumentsModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
