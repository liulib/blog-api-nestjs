import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户名', length: 30 })
  username: string;

  @Column({ comment: '用户账户', length: 10 })
  account: string;

  @Column({ comment: '密码', select: false })
  password: string;

  @Column({ comment: '邮箱', default: '' })
  email: string;

  @Column({ comment: '手机号', default: '' })
  mobile: string;

  @Column({ comment: '是否管理员  1是 0不是 ', default: 0 })
  ifManager: number;

  @Column({ comment: '状态 1正常 0禁用', default: 1 })
  status: number;

  @Column({ comment: '备注', default: '' })
  remark: string;

  @Column({ comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;

  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable({
    name: 'user_role',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[];
}
