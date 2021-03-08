/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2021-01-04 13:54:48
 * @LastEditors  : liulib
 * @LastEditTime : 2021-03-05 16:08:33
 */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户名', length: 30 })
  username: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({ comment: '手机号', nullable: true })
  mobile: string;

  @Column({ comment: '是否管理员  1是 0不是 ', default: 0 })
  ifManager: number;

  @Column({ comment: '状态 1正常 0禁用', default: 1 })
  status: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassWord() {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  async comparePassWord(password) {
    return await bcrypt.compare(password, this.password);
  }

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
