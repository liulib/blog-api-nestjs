import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Article {
  @ApiProperty({
    description: '文章id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '文章标题',
    type: String,
  })
  @Column({ comment: '文章标题', length: 64 })
  title: string;

  @ApiProperty({
    description: '文章url',
    type: String,
  })
  @Column({ comment: '文章url', length: 128 })
  url: string;

  @ApiProperty({
    description: '文章简介',
    type: String,
  })
  @Column({ type: 'text', comment: '文章简介' })
  brief: string;

  @ApiProperty({
    description: '文章简介图片URL',
    type: String,
  })
  @Column({ comment: '文章简介图片URL', length: 128, default: '' })
  briefUrl: string;

  @ApiProperty({
    description: '文章内容',
    type: String,
  })
  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @ApiProperty({
    description: '文章浏览数',
    type: Number,
  })
  @Column({ comment: '文章浏览数', default: 0 })
  viewCount: number;

  @ApiProperty({
    description: '文章点赞数',
    type: Number,
  })
  @Column({ comment: '文章点赞数', default: 0 })
  thumbsUpCount: number;

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
  @ManyToOne(
    () => Category,
    category => category.articles,
  )
  category: Category;

  @ManyToMany(
    () => Tag,
    tag => tag.articles,
  )
  @JoinTable({
    name: 'article_tag',
    joinColumns: [{ name: 'article_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: Tag[];
}
