import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Ip } from './ip.entity';
import { QueryOptionDto, UpdateIpDto } from './ip.dto';

import { ResponseData } from '@/common/interfaces/response.interface';
import { pageData } from '@/common/interfaces/pageData.interface';

@Injectable()
export class IpService {
  constructor(
    @InjectRepository(Ip)
    private ipRepository: Repository<Ip>,
  ) {}

  // 创建Ip
  async create(ipAddress: string) {
    // 查找Ip
    const ip = this.findOneByAddress(ipAddress);
    // 不存在则创建 否则不创建
    if (!ip) {
      await getRepository(Ip)
        .createQueryBuilder('ip')
        .insert()
        .into(Ip)
        .values({ ipAddress })
        .execute();
    }
  }

  // 更新Ip状态
  async update(uto: UpdateIpDto): Promise<ResponseData<null>> {
    const { id, status } = uto;
    // 查找Ip
    const ip = this.findOneById(id);

    if (!ip) return { code: 0, message: 'IP不存在' };

    const res = await getRepository(Ip)
      .createQueryBuilder('ip')
      .update()
      .set({ status })
      .where('ip.id = :id', { id })
      .execute();

    if (res.affected === 1) {
      return { code: 1, message: '更新成功' };
    } else {
      return { code: 0, message: '更新失败' };
    }
  }

  // 根据ipAddress查找ip
  async findOneByAddress(ipAddress: string): Promise<Ip> {
    return await getRepository(Ip)
      .createQueryBuilder('ip')
      .where('ip.ipAddress = :ipAddress', {
        ipAddress,
      })
      .getOne();
  }

  // 根据id查找ip
  async findOneById(id: number): Promise<Ip> {
    return await getRepository(Ip)
      .createQueryBuilder('ip')
      .where('ip.id = :id', { id })
      .getOne();
  }

  // 根据查找Ip 分页
  async findListAndCount(
    queryOption: QueryOptionDto,
  ): Promise<ResponseData<pageData<Ip>>> {
    const { page = 1, pageSize = 10, ipAddress, status } = queryOption;

    const [number, size] = [Number(page), Number(pageSize)];

    const queryOptionList = [];
    if (ipAddress) queryOptionList.push('ip.ipAddress = :ipAddress');
    if (status) queryOptionList.push('ip.status = :status');

    const queryOptionStr = queryOptionList.join(' AND ');

    const [list, total] = await getRepository(Ip)
      .createQueryBuilder('ip')
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
