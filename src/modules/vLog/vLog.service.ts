import { Injectable } from '@nestjs/common';
import { vLog } from './vLog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { ResponseData } from '@/common/interfaces/response.interface';
import { pageData } from '@/common/interfaces/pageData.interface';

import { parseUserAgent } from '@/common/utils/parseUserAgent';

import { QueryOptionDto } from './vLog.dto';

import { IpService } from '@/modules/ip/ip.service';

@Injectable()
export class vLogService {
  constructor(
    @InjectRepository(vLog)
    private vLogRepository: Repository<vLog>,
    private readonly ipService: IpService,
  ) {}

  // 创建vLog
  async create(req) {
    const { url, headers } = req;
    // 获取请求IP 需要使用nginx配合
    const ip = headers['x-real-ip'];
    // 解析请求头
    const userAgent = parseUserAgent(headers['user-agent']);

    // 记录IP
    await this.ipService.create(ip);

    // 查找是否已经存在这条记录 存在则增加计次 否则新建
    const exist = await this.vLogRepository.findOne({
      where: { ip, userAgent: headers['user-agent'], url },
    });

    if (exist) {
      const count = exist.count;
      const newData = await this.vLogRepository.merge(exist, {
        count: count + 1,
      });
      await this.vLogRepository.save(newData);
    } else {
      const newData = await this.vLogRepository.create({
        ip,
        userAgent: headers['user-agent'],
        url,
        ...userAgent,
      });
      await this.vLogRepository.save(newData);
    }
  }

  // 根据条件查找浏览记录 分页
  async findListAndCount(
    queryOption: QueryOptionDto,
  ): Promise<ResponseData<pageData<vLog>>> {
    const { page = 1, pageSize = 10, ip, url } = queryOption;

    const [number, size] = [Number(page), Number(pageSize)];

    const queryOptionList = [];
    if (ip) queryOptionList.push('vLog.ip = :ip');
    if (url) queryOptionList.push('vLog.url = :url');

    const queryOptionStr = queryOptionList.join(' AND ');

    const [list, total] = await getRepository(vLog)
      .createQueryBuilder('vLog')
      .where(queryOptionStr, queryOption)
      .skip((number - 1) * size)
      .take(size)
      .getManyAndCount();

    return {
      code: 1,
      message: '查询成功',
      data: { list, total, page: number, pageSize: size },
    };
  }
}
