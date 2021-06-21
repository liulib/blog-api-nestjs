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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '文章标题', length: 64 })
  title: string;

  @Column({ comment: '文章简介', length: 128 })
  brief: string;

  @Column({ comment: '文章简介图片URL', length: 128, default: '' })
  briefUrl: string;

  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @Column({ comment: '文章浏览数', default: 0 })
  viewCount: number;

  @Column({ comment: '文章点赞数', default: 0 })
  thumbsUpCount: number;

  @Column({ type: 'tinyint', comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  // 外键关系
  @ApiProperty()
  @ManyToOne(
    () => Category,
    category => category.articles,
  )
  category: Category;

  @ApiProperty()
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

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
