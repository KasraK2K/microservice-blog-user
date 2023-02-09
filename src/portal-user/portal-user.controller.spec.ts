import { Test, TestingModule } from '@nestjs/testing';
import { PortalUserController } from './portal-user.controller';
import { PortalUserService } from './portal-user.service';

describe('PortalUserController', () => {
  let controller: PortalUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortalUserController],
      providers: [PortalUserService],
    }).compile();

    controller = module.get<PortalUserController>(PortalUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
