import { Test, TestingModule } from '@nestjs/testing';
import { BookingsControllerController } from './bookings-controller.controller';

describe('BookingsControllerController', () => {
  let controller: BookingsControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsControllerController],
    }).compile();

    controller = module.get<BookingsControllerController>(BookingsControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
