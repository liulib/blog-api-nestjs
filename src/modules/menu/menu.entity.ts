import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Role } from '../role/role.entity';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Menu {
  @ApiProperty({
    description: '菜单id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '父级菜单id',
    type: Number,
  })
  @Column({ comment: '父级菜单id', default: 0 })
  parentId: number;

  @ApiProperty({
    description: '菜单名称',
    type: String,
  })
  @Column({ comment: '菜单名称' })
  menuName: string;

  @ApiProperty({
    description: '菜单类型 0目录 1菜单 2按钮',
    type: Number,
  })
  @Column({ comment: '菜单类型 0目录 1菜单 2按钮' })
  menuType: number;

  @ApiProperty({
    description: '菜单状态 0禁用 1启用',
    type: Number,
  })
  @Column({ comment: '菜单状态 0禁用 1启用', default: 1 })
  status: number;

  @ApiProperty({
    description: '菜单url',
    type: String,
  })
  @Column({ comment: '菜单url', default: '' })
  url: string;

  @ApiProperty({
    description: '权限标志',
    type: String,
  })
  @Column({ comment: '权限标志', default: '' })
  perms: string;

  @ApiProperty({
    description: '排序',
    type: Number,
  })
  @Column({ comment: '排序', default: 0 })
  order: number;

  @ApiProperty({
    description: '备注',
    type: String,
  })
  @Column({ comment: '备注', nullable: true })
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
    () => Role,
    role => role.menus,
    { cascade: true },
  )
  roles: Role[];
}
