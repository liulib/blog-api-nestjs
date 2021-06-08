import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Article } from '../article/article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '分类名称', length: 32 })
  categoryName: string;

  @Column({ comment: '分类描述', length: 128 })
  categoryDes: string;

  @Column({ comment: '上级ID', default: 0 })
  parentId: number;

  // 外键关系
  @OneToMany(
    () => Article,
    article => article.category,
  )
  articles: Array<Article>;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
