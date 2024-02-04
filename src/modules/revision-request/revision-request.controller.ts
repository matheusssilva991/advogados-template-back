import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateRevisionRequestDto } from './dto/create-revision-request.dto';
import { RevisionRequestFilterDto } from './dto/revision-request-filter.dto';
import { UpdateRevisionRequestDto } from './dto/update-revision-request.dto';
import { RevisionRequest } from './entities/revision-request.entity';
import { RevisionRequestService } from './revision-request.service';

@Controller('api')
export class RevisionRequestController {
  constructor(
    private readonly revisionRequestService: RevisionRequestService,
  ) {}

  @Post('revision-request')
  async create(
    @Body() createRevisionRequestDto: CreateRevisionRequestDto,
  ): Promise<RevisionRequest> {
    return this.revisionRequestService.create(createRevisionRequestDto);
  }

  @Get('revision-requests')
  async findAll(
    @Query() query: RevisionRequestFilterDto,
  ): Promise<RevisionRequest[]> {
    if (Object.keys(query).length) {
      return this.revisionRequestService.findAllWithFilter(query);
    }
    return this.revisionRequestService.findAll();
  }

  @Get('revision-request/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionRequest> {
    return this.revisionRequestService.findOne(+id);
  }

  @Patch('revision-request/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevisionRequestDto: UpdateRevisionRequestDto,
  ): Promise<UpdateResult> {
    return this.revisionRequestService.update(+id, updateRevisionRequestDto);
  }

  @Delete('revision-request/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionRequest> {
    return this.revisionRequestService.remove(+id);
  }
}
