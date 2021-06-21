import { Module } from '@nestjs/common';
import { vLogService } from './vLog.service';
import { vLogController } from './vLog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { vLog } from './vLog.entity';

import { IpModule } from '@/modules/ip/ip.module';

@Module({
  imports: [IpModule, TypeOrmModule.forFeature([vLog])],
  providers: [vLogService],
  controllers: [vLogController],
  exports: [vLogService],
})
export class vLogModule {}
