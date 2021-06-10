import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Role } from '../role/role.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '父级菜单id', default: 0 })
  parentId: number;

  @Column({ comment: '菜单名称' })
  menuName: string;

  @Column({ comment: '菜单类型 0目录 1菜单 2按钮' })
  menuType: number;

  @Column({ comment: '菜单状态 0禁用 1启用', default: 1 })
  status: number;

  @Column({ comment: '菜单url', default: null })
  url: string;

  @Column({ comment: '权限标志', default: null })
  perms: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '是否删除 1删除 0未删除', default: 0 })
  isDelete: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;

  @ManyToMany(
    () => Role,
    role => role.menus,
    { cascade: true },
  )
  roles: Role[];
}
