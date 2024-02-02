import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { ProcessDocumentsModule } from '../process-documents/process-documents.module';
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
    forwardRef(() => ProcessDocumentsModule),
  ],
  controllers: [ProcessController],
  providers: [ProcessService],
  exports: [ProcessService],
})
export class ProcessModule {}
