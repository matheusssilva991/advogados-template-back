import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { ProcessModule } from './modules/process/process.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
