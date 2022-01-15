import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    type: Number,
    description: '父级id',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  readonly parentId: number;

  @ApiProperty({
    type: String,
    description: '菜单名',
    required: true,
  })
  @IsNotEmpty({ message: '菜单名不能为空' })
  @IsString()
  readonly menuName: string;

  @ApiProperty({
    type: Number,
    description: '菜单类型 0目录 1菜单 2按钮',
    required: true,
  })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @IsNumber()
  readonly menuType: number;

  @ApiProperty({
    type: Number,
    description: '菜单状态 0禁用 1启用',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly status: number;

  @ApiProperty({
    type: String,
    description: '菜单url',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly url: string;

  @ApiProperty({
    type: String,
    description: '菜单权限',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly perms: string;

  @ApiProperty({
    type: Number,
    description: '排序',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly order: number;

  @ApiProperty({
    type: String,
    description: '菜单备注',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly remark: string;

  @ApiProperty({
    type: Number,
    description: '是否删除 1删除 0未删除',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: '菜单是否删除不能为空' })
  readonly isDelete: number;
}

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({
    type: Number,
    description: '菜单ID',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty({ message: '菜单ID不能为空' })
  readonly id: number;
}
