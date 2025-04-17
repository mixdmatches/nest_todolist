import { Column, OneToMany, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/modules/tasks/entities/task.entity';
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn() // 主键，自增的 numbe
  id: number;

  @Column({ select: false })
  user_id: number;

  @Column()
  category_name: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
