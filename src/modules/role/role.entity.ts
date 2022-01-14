/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:09:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-14 14:24:57
 */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from '../user/user.entity';
import { Menu } from '../menu/menu.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role {
  @ApiProperty({
    description: '角色id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '角色名',
    type: String,
  })
  @Column({ comment: '角色名' })
  roleName: string;

  @ApiProperty({
    description: '备注',
    type: String,
  })
  @Column({ comment: '备注', default: '' })
  remark: string;

  @ApiProperty({
    description: '是否删除 1删除 0未删除',
    type: Number,
  })
  @Column({ comment: '是否删除 1删除 0未删除', default: 0 })
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
    () => User,
    user => user.roles,
    { cascade: true },
  )
  users: User[];

  @ManyToMany(
    () => Menu,
    menu => menu.roles,
  )
  @JoinTable({
    name: 'role_menu',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'menu_id' }],
  })
  menus: Menu[];
}
