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
  content: string;

  @Column({ comment: '回复ID 为0说明是父级评论', default: 0 })
  replyId: number;

  @Column({ comment: '评论用户ID' })
  userId: number;

  @Column({ comment: '评论文章ID' })
  articleId: number;

  @Column({ type: 'tinyint', comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
