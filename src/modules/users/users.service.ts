import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

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
}
