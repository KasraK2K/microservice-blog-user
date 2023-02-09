import { Test, TestingModule } from '@nestjs/testing';
import { PortalUserService } from './portal-user.service';

describe('PortalUserService', () => {
  let service: PortalUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortalUserService],
    }).compile();

    service = module.get<PortalUserService>(PortalUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
