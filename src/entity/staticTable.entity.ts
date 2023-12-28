import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Goods } from './goods.entity';

@Entity('static_table')
export class StaticTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '文件路径' })
  src: string;

  @ManyToMany(() => Goods, goods => goods.static_table)
  goods: Goods[];

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_time: Date;
}
