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
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  ip: string;

  @ApiProperty()
  @Column({ default: '' })
  userAgent: string;

  @ApiProperty()
  @Column({ default: '', length: 128 })
  url: string;

  @ApiProperty()
  @Column({ default: '', length: 128 })
  browser: string;

  @ApiProperty()
  @Column({ default: '', length: 64 })
  engine: string;

  @ApiProperty()
  @Column({ default: '', length: 32 })
  os: string;

  @ApiProperty()
  @Column({ default: '', length: 32 })
  device: string;

  @ApiProperty()
  @Column({ default: 0 })
  count: number;

  @CreateDateColumn({ comment: '创建时间' })
  createdAt: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updatedAt: string;
}
