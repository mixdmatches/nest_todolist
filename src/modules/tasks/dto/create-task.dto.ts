import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  category_id: number;

  tag_id: number;

  @IsNotEmpty({ message: '任务标题不能为空' })
  title: string;

  content: string;

  level: number;
}
