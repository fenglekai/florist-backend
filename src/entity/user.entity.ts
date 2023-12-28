import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  uuid: string;

  @Column({ comment: '用户名' })
  username: string;

  @Column({ comment: '登录次数' })
  login_num: number;

  @ManyToMany(() => Goods, goods => goods.like_user)
  like_goods: Goods[];

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_time: Date;
}
