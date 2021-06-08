import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Article } from '../article/article.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '标签名', length: 32 })
  tagName: string;

  @Column({ comment: '标签描述', length: 64 })
  tagDes: string;

  @ApiProperty()
  @ManyToMany(
    () => Article,
    article => article.tags,
    { cascade: true },
  )
  articles: Array<Article>;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
