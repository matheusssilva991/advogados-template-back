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
import { CreateRevisionRequestDto } from './dto/create-revision-request.dto';
import { UpdateRevisionRequestDto } from './dto/update-revision-request.dto';
import { RevisionRequestService } from './revision-request.service';
import { RevisionRequestFilterDto } from './dto/revision-request-filter.dto';

@Controller('api')
export class RevisionRequestController {
  constructor(
    private readonly revisionRequestService: RevisionRequestService,
  ) {}

  @Post('revision-request')
  async create(@Body() createRevisionRequestDto: CreateRevisionRequestDto) {
    return this.revisionRequestService.create(createRevisionRequestDto);
  }

  @Get('revision-requests')
  async findAll(@Query() query: RevisionRequestFilterDto) {
    if (Object.keys(query).length) {
      return this.revisionRequestService.findAllWithFilter(query);
    }
    return this.revisionRequestService.findAll();
  }

  @Get('revision-request/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.revisionRequestService.findOne(+id);
  }

  @Patch('revision-request/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevisionRequestDto: UpdateRevisionRequestDto,
  ) {
    return this.revisionRequestService.update(+id, updateRevisionRequestDto);
  }

  @Delete('revision-request/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.revisionRequestService.remove(+id);
  }
}
