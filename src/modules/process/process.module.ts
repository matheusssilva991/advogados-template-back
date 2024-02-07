import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { SpecialtyModule } from '../specialty/specialty.module';
import { UserModule } from '../user/user.module';
import { Process } from './entities/process.entity';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Process]),
    UserModule,
    CategoryModule,
    SpecialtyModule,
    AuthModule,
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService],
})
export class ProcessModule {}
