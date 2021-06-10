import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly parentId: number;
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: '菜单名不能为空' })
  @IsString()
  readonly menuName: string;
  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @IsNumber()
  readonly menuType: number;
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  readonly status: number;
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly url: string;
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly perms: string;
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  readonly remark: string;
  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  @IsOptional()
  readonly isDelete: number;
}

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty({ message: '菜单ID不能为空' })
  readonly id: number;
}
