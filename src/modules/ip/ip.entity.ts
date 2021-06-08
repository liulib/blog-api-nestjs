import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'ip地址' })
  ipAddress: string;

  @Column({ comment: '状态 1正常 0禁用', default: 1 })
  status: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
