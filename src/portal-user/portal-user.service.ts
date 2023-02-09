import { plainToClass } from 'class-transformer'
import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { CreatePortalUserDto } from './dto/create-portal-user.dto'
import { UpdatePortalUserDto } from './dto/update-portal-user.dto'
import { PortalUser } from './entities/portal-user.entity'
import { FindPortalUserDto } from './dto/find-portal-user.dto'

@Injectable()
export class PortalUserService {
  constructor(@InjectRepository(PortalUser) private portalUserRepository: Repository<PortalUser>) {}

  async create(createPortalUserDto: CreatePortalUserDto): Promise<PortalUser> {
    try {
      const portalUserInstance = plainToClass(PortalUser, createPortalUserDto)
      return await this.portalUserRepository.save(portalUserInstance)
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }

  findAll(): Promise<PortalUser[]> {
    return this.portalUserRepository.find()
  }

  findById(id: number): Promise<PortalUser> {
    return this.portalUserRepository.findOneBy({ id })
  }

  findOne(findPortalUserDto: FindPortalUserDto): Promise<PortalUser> {
    return this.portalUserRepository.findOneBy(findPortalUserDto)
  }

  async update(id: number, updatePortalUserDto: UpdatePortalUserDto): Promise<UpdateResult> {
    try {
      const PortalUserInstance = plainToClass(PortalUser, updatePortalUserDto)
      return await this.portalUserRepository.update({ id }, PortalUserInstance)
    } catch (error) {
      throw new ConflictException(error.message)
    }
  }

  softDelete(id: number): Promise<UpdateResult> {
    return this.portalUserRepository.softDelete(id)
  }

  restore(id: number) {
    return this.portalUserRepository.restore(id)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.portalUserRepository.delete(id)
  }
}
