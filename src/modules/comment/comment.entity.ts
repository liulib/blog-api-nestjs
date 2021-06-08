import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '评论内容' })
  commentContent: string;

  @Column({ comment: '上级ID', default: 0 })
  parentId: number;

  @Column({ comment: '评论用户ID' })
  userId: number;

  @Column({ comment: '评论文章ID' })
  articleId: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
