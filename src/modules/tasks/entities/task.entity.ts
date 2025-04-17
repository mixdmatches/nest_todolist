import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';
@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category: Category) => category.tasks)
  @JoinColumn({ name: 'category_id' }) // 明确指定外键列名
  category: Category;

  @Column()
  tag_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  create_time: Date;

  @Column()
  finish_time: Date;

  @Column()
  status: number;

  @Column()
  level: number;
}
