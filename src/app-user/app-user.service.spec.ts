import { Test, TestingModule } from '@nestjs/testing'
import { AppUserService } from './app-user.service'

describe('AppUserService', () => {
  let service: AppUserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppUserService]
    }).compile()

    service = module.get<AppUserService>(AppUserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
