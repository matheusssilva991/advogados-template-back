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
  UseGuards,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { LawyerRevisionRequestGuard } from '../../common/guards/lawyer-revision-request.guard';
import { RolesGuard } from '../../common/guards/role.guard';
import { CreateRevisionRequestDto } from './dto/create-revision-request.dto';
import { RevisionRequestFilterDto } from './dto/revision-request-filter.dto';
import { UpdateRevisionRequestDto } from './dto/update-revision-request.dto';
import { RevisionRequest } from './entities/revision-request.entity';
import { RevisionRequestService } from './revision-request.service';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RevisionRequestController {
  constructor(
    private readonly revisionRequestService: RevisionRequestService,
  ) {}

  @Post('revision-request')
  @Roles(Role.lawyer)
  @UseGuards(LawyerRevisionRequestGuard)
  async create(
    @Body() createRevisionRequestDto: CreateRevisionRequestDto,
  ): Promise<RevisionRequest> {
    return this.revisionRequestService.create(createRevisionRequestDto);
  }

  @Get('revision-requests')
  @Roles(Role.admin, Role.lawyer)
  async findAll(
    @Query() query: RevisionRequestFilterDto,
  ): Promise<RevisionRequest[]> {
    if (Object.keys(query).length) {
      return this.revisionRequestService.findAllWithFilter(query);
    }
    return this.revisionRequestService.findAll();
  }

  @Get('revision-request/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionRequest> {
    return this.revisionRequestService.findOne(+id);
  }

  @Patch('revision-request/:id')
  @Roles(Role.lawyer)
  @UseGuards(LawyerRevisionRequestGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRevisionRequestDto: UpdateRevisionRequestDto,
  ): Promise<UpdateResult> {
    return this.revisionRequestService.update(+id, updateRevisionRequestDto);
  }

  @Delete('revision-request/:id')
  @UseGuards(LawyerRevisionRequestGuard)
  @Roles(Role.lawyer)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RevisionRequest> {
    return this.revisionRequestService.remove(+id);
  }
}
