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
  @ApiProperty({
    description: '标签id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '标签名',
    type: String,
  })
  @Column({ comment: '标签名', length: 32 })
  tagName: string;

  @ApiProperty({
    description: '标签描述',
    type: String,
  })
  @Column({ comment: '标签描述', length: 64, default: '' })
  tagDes: string;

  @ApiProperty({
    description: '标签颜色',
    type: String,
  })
  @Column({ comment: '标签颜色', length: 64, default: '' })
  tagColor: string;

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

  @ManyToMany(
    () => Article,
    article => article.tags,
    { cascade: true },
  )
  articles: Array<Article>;
}
