/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 14:09:38
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-05 14:36:23
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

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '角色名' })
  roleName: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

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
