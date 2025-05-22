import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

/**
 * 用户控制器，处理用户相关的路由请求
 */
@ApiTags('用户模块')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 用户注册接口
   * @param createUserDto 用户注册信息
   */
  @ApiOperation({ summary: '注册用户' })
  @Public()
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.register(createUserDto);
  }

  /**
   * 更新用户信息接口
   * @param id 用户ID
   * @param updateUserDto 用户更新信息
   * @returns 更新后的用户实体
   */
  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(+id, updateUserDto);
  }
}
