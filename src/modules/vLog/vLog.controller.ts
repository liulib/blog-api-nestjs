import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { vLogService } from './vLog.service';

import { QueryOptionDto } from './vLog.dto';

import { PermissionGuard, Perms } from '@/modules/auth/perms.guard';
import { AuthGuard } from '@nestjs/passport';

import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { vLog } from './vLog.entity';

@ApiTags('日志模块')
@Controller('vLog')
export class vLogController {
  constructor(private vService: vLogService) {}

  @ApiOperation({
    summary: '获取日志列表分页',
  })
  @ApiOkResponse({ type: vLog })
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Perms('/admin/system/vLog/getList')
  @Get('getList')
  async findListAndCount(@Query() qto: QueryOptionDto) {
    return this.vService.findListAndCount(qto);
  }
}
