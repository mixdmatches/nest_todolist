import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { Repository } from 'typeorm';

/**
 * 任务服务类，处理任务相关的业务逻辑
 */
@Injectable()
export class TasksService {
  /**
   * 构造函数，注入任务实体的仓库
   * @param tasksRepository 任务实体仓库
   */
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  /**
   * 创建新任务
   * @param id 用户ID
   * @param createTaskDto 任务创建数据
   */
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

  /**
   * 获取指定用户的所有任务列表
   * @param id 用户ID
   * @returns 任务数组
   */
  findAll(id: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user_id: id },
      relations: ['category'], // 关联 category 表
      select: {
        id: true,
        title: true,
        content: true,
        create_time: true,
        finish_time: true,
        status: true,
        level: true,
        category: {
          category_name: true,
        },
      },
    });
  }

  /**
   * 获取单个任务详情
   * @param id 任务ID
   * @returns 任务实体或 null
   */
  async findOne(id: number): Promise<Task | null> {
    return await this.tasksRepository.findOneBy({ id });
  }

  /**
   * 更新任务信息
   * @param id 任务ID
   * @param updateTaskDto 任务更新数据
   */
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, updateTaskDto);
  }

  /**
   * 删除任务
   * @param id 任务ID
   */
  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
