import { Controller, Get, Query } from '@nestjs/common';

import { vLogService } from './vLog.service';

import { QueryOptionDto } from './vLog.dto';

@Controller('vLog')
export class vLogController {
  constructor(private vService: vLogService) {}

  @Get('getList')
  async findListAndCount(@Query() qto: QueryOptionDto) {
    return this.vService.findListAndCount(qto);
  }
}
