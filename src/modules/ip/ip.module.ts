import { Module } from '@nestjs/common';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ip } from './ip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ip])],
  controllers: [IpController],
  providers: [IpService],
  exports: [IpService],
})
export class IpModule {}
