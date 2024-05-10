import { Test, TestingModule } from '@nestjs/testing';
import { UserRecordRmsService } from './user-record-rms.service';

describe('UserRecordRmsService', () => {
  let service: UserRecordRmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRecordRmsService],
    }).compile();

    service = module.get<UserRecordRmsService>(UserRecordRmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
