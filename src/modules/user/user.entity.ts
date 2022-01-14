import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../role/role.entity';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '用户名 最长30',
  })
  @Column({ comment: '用户名', length: 30 })
  username: string;

  @ApiProperty({
    description: '用户账户 长度6-30',
  })
  @Column({ comment: '用户账户', length: 30 })
  account: string;

  @ApiProperty({
    description: '密码',
  })
  @Column({ comment: '密码', select: false })
  password: string;

  @ApiProperty({
    description: '邮箱',
  })
  @Column({ comment: '邮箱', default: '' })
  email: string;

  @ApiProperty({
    description: '手机号',
  })
  @Column({ comment: '手机号', default: '' })
  mobile: string;

  @ApiProperty({
    description: '是否管理员  1是 0不是',
  })
  @Column({ comment: '是否管理员  1是 0不是', default: 0 })
  ifManager: number;

  @ApiProperty({
    description: '状态 1正常 0禁用',
  })
  @Column({ comment: '状态 1正常 0禁用', default: 1 })
  status: number;

  @ApiProperty({
    description: '备注',
  })
  @Column({ comment: '备注', default: '' })
  remark: string;

  @ApiProperty({
    description: '是否删除 1删除 0未删除',
  })
  @Column({ comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @ApiProperty({
    description: '创建时间',
  })
  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @ApiProperty({
    description: '更新时间',
  })
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
