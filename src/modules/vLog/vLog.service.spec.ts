import { Test, TestingModule } from '@nestjs/testing';
import { vLogService } from './vLog.service';

describe('LogsService', () => {
  let service: vLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [vLogService],
    }).compile();

    service = module.get<vLogService>(vLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
