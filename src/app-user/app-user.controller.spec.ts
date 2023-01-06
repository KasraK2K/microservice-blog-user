import { Test, TestingModule } from '@nestjs/testing';
import { AppUserController } from './app-user.controller';
import { AppUserService } from './app-user.service';

describe('AppUserController', () => {
  let controller: AppUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppUserController],
      providers: [AppUserService]
    }).compile();

    controller = module.get<AppUserController>(AppUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
