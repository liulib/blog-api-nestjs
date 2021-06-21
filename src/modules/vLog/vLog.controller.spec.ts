import { Test, TestingModule } from '@nestjs/testing';
import { vLogController } from './vLog.controller';

describe('LogsController', () => {
  let controller: vLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [vLogController],
    }).compile();

    controller = module.get<vLogController>(vLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
