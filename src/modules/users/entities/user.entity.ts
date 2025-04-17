import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  // @Exclude()
  password: string;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @Column()
  create_time: Date;

  @Column()
  status: number;
}
