import { Controller, Get, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { IpService } from './ip.service';

import { QueryOptionDto } from './ip.dto';

@Controller('ip')
export class IpController {
  constructor(private ipService: IpService) {}

  @Get('getList')
  async findListAndCount(
    @Req() res: Request,
    @Query() queryOption: QueryOptionDto,
  ) {
    console.log(res.headers['x-real-ip']);
    console.log(res.headers['x-forwarded-for']);
    return this.ipService.findListAndCount(queryOption);
  }
}
