import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn() // 主键，自增的 numbe
  id: number;

  @Column({ select: false })
  user_id: number;

  @Column()
  category_name: string;
}
