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
import { CreateRevisionResponseDto } from './dto/create-revision-response.dto';
import { RevisionResponseFilterDto } from './dto/revision-response-filter.dto';
import { UpdateRevisionResponseDto } from './dto/update-revision-response.dto';
import { RevisionResponse } from './entities/revision-response.entity';
import { RevisionResponseService } from './revision-response.service';

@Controller('api')
export class RevisionResponseController {
  constructor(
    private readonly revisionResponseService: RevisionResponseService,
  ) {}

  @Post('revision-response')
  async create(
    @Body() createRevisionResponseDto: CreateRevisionResponseDto,
  ): Promise<RevisionResponse> {
    return this.revisionResponseService.create(createRevisionResponseDto);
  }

  @Get('revision-responses')
  async findAll(
    @Query() query: RevisionResponseFilterDto,
  ): Promise<RevisionResponse[]> {
    if (Object.keys(query).length) {
      return this.revisionResponseService.findAllWithFilter(query);
    }
    return this.revisionResponseService.findAll();
  }

  @Get('revision-response/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionResponse> {
    return this.revisionResponseService.findOne(+id);
  }

  @Patch('revision-response/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevisionResponseDto: UpdateRevisionResponseDto,
  ): Promise<UpdateResult> {
    return this.revisionResponseService.update(+id, updateRevisionResponseDto);
  }

  @Delete('revision-response/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionResponse> {
    return this.revisionResponseService.remove(+id);
  }
}
