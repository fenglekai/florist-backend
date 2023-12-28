import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '分类名称' })
  name: string;

  @OneToMany(() => Goods, goods => goods.cate)
  goods: Goods[];

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_time: Date;
}
