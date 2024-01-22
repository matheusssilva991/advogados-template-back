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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: UserFilterDto): Promise<User[]> {
    if (Object.keys(query).length) {
      return await this.userService.findAllWithFilter(query);
    }
    return await this.userService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Patch('user/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete('user/:id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.remove(+id);
  }
}
