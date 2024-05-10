import { Test, TestingModule } from '@nestjs/testing';
import { UserRecordWeightService } from './user-record-weight.service';

describe('UserRecordWeightService', () => {
  let service: UserRecordWeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRecordWeightService],
    }).compile();

    service = module.get<UserRecordWeightService>(UserRecordWeightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
