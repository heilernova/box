import { Test, TestingModule } from '@nestjs/testing';
import { ProfileRmsController } from './profile-rms.controller';

describe('ProfileRmsController', () => {
  let controller: ProfileRmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileRmsController],
    }).compile();

    controller = module.get<ProfileRmsController>(ProfileRmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
