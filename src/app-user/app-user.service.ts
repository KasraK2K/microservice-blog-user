import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAppUserDto } from './dto/create-app-user.dto';
import { UpdateAppUserDto } from './dto/update-app-user.dto';
import { AppUser } from './entities/app-user.entity';

@Injectable()
export class AppUserService {
  constructor(
    @InjectRepository(AppUser)
    private appUserRepository: Repository<AppUser>
  ) {}

  create(createAppUserDto: CreateAppUserDto): Promise<CreateAppUserDto & AppUser> {
    return this.appUserRepository.save(createAppUserDto);
  }

  findAll(): Promise<AppUser[]> {
    return this.appUserRepository.find();
  }

  findOne(id: number): Promise<AppUser> {
    return this.appUserRepository.findOneBy({ id });
  }

  update(id: number, updateAppUserDto: UpdateAppUserDto): Promise<UpdateResult> {
    return this.appUserRepository.update({ id }, updateAppUserDto);
  }

  softDelete(id: number): Promise<UpdateResult> {
    return this.appUserRepository.softDelete(id);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.appUserRepository.delete(id);
  }
}
