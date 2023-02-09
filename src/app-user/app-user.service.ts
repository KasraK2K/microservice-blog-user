import { plainToClass } from 'class-transformer'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreateAppUserDto } from './dto/create-app-user.dto'
import { UpdateAppUserDto } from './dto/update-app-user.dto'
import { AppUser } from './entities/app-user.entity'
import { FindAppUserDto } from './dto/find-app-user.dto'

@Injectable()
export class AppUserService {
  constructor(
    @InjectRepository(AppUser)
    private appUserRepository: Repository<AppUser>
  ) {}

  async create(createAppUserDto: CreateAppUserDto): Promise<AppUser> {
    try {
      const appUserInstance = plainToClass(AppUser, createAppUserDto)
      return await this.appUserRepository.save(appUserInstance)
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }

  findAll(): Promise<AppUser[]> {
    return this.appUserRepository.find()
  }

  findById(id: number): Promise<AppUser> {
    return this.appUserRepository.findOneBy({ id })
  }

  findOne(findAppUserDto: FindAppUserDto): Promise<AppUser> {
    return this.appUserRepository.findOneBy(findAppUserDto)
  }

  async update(id: number, updateAppUserDto: UpdateAppUserDto): Promise<UpdateResult> {
    try {
      const appUserInstance = plainToClass(AppUser, updateAppUserDto)
      return await this.appUserRepository.update({ id }, appUserInstance)
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }

  softDelete(id: number): Promise<UpdateResult> {
    return this.appUserRepository.softDelete(id)
  }

  restore(id: number) {
    return this.appUserRepository.restore(id)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.appUserRepository.delete(id)
  }
}
