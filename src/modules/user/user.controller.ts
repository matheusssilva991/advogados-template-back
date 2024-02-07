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
import { RolesGuard } from '../../common/guards/role.guard';
import { UserOwnProfileGuard } from '../../common/guards/user-own-profile.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @Roles(Role.admin)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('users')
  @Roles(Role.admin, Role.lawyer)
  async findAll(@Query() query: UserFilterDto): Promise<User[]> {
    if (Object.keys(query).length) {
      return await this.userService.findAllWithFilter(query);
    }
    return await this.userService.findAll();
  }

  @Get('user/:id')
  @Roles(Role.admin, Role.lawyer)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Patch('user/:id')
  @Roles(Role.admin, Role.lawyer)
  @UseGuards(UserOwnProfileGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  @Roles(Role.admin)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.remove(+id);
  }
}
