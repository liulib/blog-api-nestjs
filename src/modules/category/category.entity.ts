import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Article } from '../article/article.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({
    description: '分类id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '分类名称',
    type: String,
  })
  @Column({ comment: '分类名称', length: 32 })
  categoryName: string;

  @ApiProperty({
    description: '分类描述',
    type: String,
  })
  @Column({ comment: '分类描述', length: 64, default: '' })
  categoryDes: string;

  @ApiProperty({
    description: '是否删除 1删除 0未删除',
    type: Number,
  })
  @Column({ type: 'tinyint', comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @ApiProperty({
    description: '创建时间',
    type: String,
  })
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @ApiProperty({
    description: '更新时间',
    type: String,
  })
  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;

  // 外键关系
  @OneToMany(
    () => Article,
    article => article.category,
  )
  articles: Array<Article>;
}
