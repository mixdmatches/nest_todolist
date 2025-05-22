import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 * 任务控制器，处理任务相关的路由请求
 */
@ApiTags('任务模块')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * 创建任务接口
   * @param createTaskDto 任务创建数据
   * @param request 请求对象（用于获取用户信息）
   */
  @ApiOperation({ summary: '创建任务' })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    const user = (request as any)['user'] as Record<string, any>;
    return await this.tasksService.create(user.sub, createTaskDto);
  }

  /**
   * 获取任务列表接口
   * @param request 请求对象（用于获取用户信息）
   */
  @ApiOperation({ summary: '获取任务列表' })
  @Get()
  findAll(@Req() request: Request) {
    const user = (request as any)['user'] as Record<string, any>;
    return this.tasksService.findAll(user.sub);
  }

  /**
   * 获取任务详情接口
   * @param id 任务ID
   */
  @ApiOperation({ summary: '获取任务详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  /**
   * 更新任务接口
   * @param id 任务ID
   * @param updateTaskDto 任务更新数据
   */
  @ApiOperation({ summary: '更新任务' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  /**
   * 删除任务接口
   * @param id 任务ID
   */
  @ApiOperation({ summary: '删除任务' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
