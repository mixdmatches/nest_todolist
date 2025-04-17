import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  category_id: number;

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
