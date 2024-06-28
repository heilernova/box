import { Test, TestingModule } from '@nestjs/testing';
import { LocationsCountriesController } from './locations-countries.controller';

describe('LocationsCountriesController', () => {
  let controller: LocationsCountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsCountriesController],
    }).compile();

    controller = module.get<LocationsCountriesController>(LocationsCountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
