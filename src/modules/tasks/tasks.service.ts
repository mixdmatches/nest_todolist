import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async create(id: number, createTaskDto: CreateTaskDto) {
    const createTime = new Date();
    const year = createTime.getFullYear();
    const month = createTime.getMonth() + 1;
    const day = createTime.getDate();
    const hh = createTime.getHours();
    const mm = createTime.getMinutes();
    const ss = createTime.getSeconds();
    const formattedDate = `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
    const newTask = {
      user_id: id,
      ...createTaskDto,
      create_time: formattedDate,
    };
    await this.tasksRepository.save(newTask);
  }

  findAll(id: number): Promise<Task[]> {
    return this.tasksRepository.findBy({ user_id: id });
  }

  async findOne(id: number): Promise<Task | null> {
    return await this.tasksRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
