import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ExecutionContext,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('任务模块')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: '创建任务' })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    const user = (request as any)['user'] as Record<string, any>;
    return await this.tasksService.create(user.sub, createTaskDto);
  }

  @ApiOperation({ summary: '获取任务列表' })
  @Get()
  findAll(@Req() request: Request) {
    const user = (request as any)['user'] as Record<string, any>;
    return this.tasksService.findAll(user.sub);
  }

  @ApiOperation({ summary: '获取任务详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({ summary: '更新任务' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @ApiOperation({ summary: '删除任务' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
