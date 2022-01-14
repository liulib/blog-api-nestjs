import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class vLog {
  @ApiProperty({
    description: '日志id',
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'ip地址',
    type: String,
  })
  @Column({ comment: 'ip地址' })
  ip: string;

  @ApiProperty({
    description: '请求头',
    type: String,
  })
  @Column({ comment: 'ip地址', default: '' })
  userAgent: string;

  @ApiProperty({
    description: '请求地址',
    type: String,
  })
  @Column({ comment: '请求地址', default: '', length: 128 })
  url: string;

  @ApiProperty({
    description: '浏览器版本',
    type: String,
  })
  @Column({ comment: '浏览器版本', default: '', length: 128 })
  browser: string;

  @ApiProperty({
    description: '引擎',
    type: String,
  })
  @Column({ comment: '引擎', default: '', length: 64 })
  engine: string;

  @ApiProperty({
    description: '操作系统',
    type: String,
  })
  @Column({ comment: '操作系统', default: '', length: 32 })
  os: string;

  @ApiProperty({
    description: '操作设备',
    type: String,
  })
  @Column({ comment: '操作设备', default: '', length: 32 })
  device: string;

  @ApiProperty({
    description: '浏览次数',
    type: Number,
  })
  @Column({ comment: '浏览次数', default: 0 })
  count: number;

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
}
