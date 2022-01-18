import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @ApiProperty({
    description: '评论id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '评论内容',
    type: String,
  })
  @Column({ comment: '评论内容' })
  content: string;

  @ApiProperty({
    description: '回复ID 为0说明是父级评论',
    type: Number,
  })
  @Column({ comment: '回复ID 为0说明是父级评论', default: 0 })
  replyId: number;

  @ApiProperty({
    description: '评论用户ID',
    type: Number,
  })
  @Column({ comment: '评论用户ID' })
  userId: number;

  @ApiProperty({
    description: '评论用户名',
    type: String,
  })
  @Column({ comment: '评论用户名' })
  username: string;

  @ApiProperty({
    description: '评论文章ID',
    type: Number,
  })
  @Column({ comment: '评论文章ID' })
  articleId: number;

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
}
