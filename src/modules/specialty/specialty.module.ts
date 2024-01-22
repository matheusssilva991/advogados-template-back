import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { Category } from '../category/entities/category.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { Specialty } from './entities/specialty.entity';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyService } from './specialty.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specialty, User, Category]),
    UserModule,
    CategoryModule,
  ],
  controllers: [SpecialtyController],
  providers: [SpecialtyService],
  exports: [SpecialtyService],
})
export class SpecialtyModule {}
