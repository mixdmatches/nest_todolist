import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('用户模块')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '注册用户' })
  @Public()
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.register(createUserDto);
  }
}
