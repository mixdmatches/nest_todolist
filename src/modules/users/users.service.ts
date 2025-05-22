import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
/**
 * 用户服务类，处理用户相关的业务逻辑
 */
@Injectable()
export class UsersService {
  /**
   * 构造函数，注入用户实体的仓库
   * @param usersRepository 用户实体仓库
   */
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  /**
   * 根据用户名查找用户
   * @param username 用户名
   * @returns 用户实体或 null
   */
  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  /**
   * 用户注册方法
   * @param createUserDto 用户注册数据传输对象
   */
  async register({ username, password }: CreateUserDto): Promise<void> {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    await this.usersRepository.save({
      username,
      password,
      create_time: formattedDate,
    });
  }

  /**
   * 更新用户信息
   * @param id 用户ID
   * @param updateUserDto 用户更新数据传输对象
   * @returns 更新后的用户实体
   */
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneByOrFail({ id });
  }
}
