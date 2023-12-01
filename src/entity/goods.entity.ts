import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { StaticTable } from './staticTable.entity';

@Entity('goods')
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, cate => cate.goods)
  @JoinColumn({ name: 'cate_id' })
  cate: Category;

  @ManyToMany(() => StaticTable, static_table => static_table.goods)
  @JoinTable({
    name: 'goods_with_static_table',
    joinColumn: { name: 'goods_id' },
    inverseJoinColumn: { name: 'static_table_id' },
  })
  static_table: StaticTable[];

  @Column()
  like_num: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  delete_time: Date;
}
