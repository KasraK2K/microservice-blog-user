import { AppUser } from './entities/app-user.entity'
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { AppUserService } from './app-user.service'
import { CreateAppUserDto } from './dto/create-app-user.dto'
import { UpdateAppUserDto } from './dto/update-app-user.dto'
import { FindAppUserDto } from './dto/find-app-user.dto'
import { plainToClass } from 'class-transformer'
import { AppUserGuard } from './../auth/guards/appUser.guard'
import { RolesGuard } from '../auth/guards/role.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { RoleName } from '../common/enums/general.enum'
import { Permissions } from '../auth/decorators/permissions.decorator'

@ApiTags('app-user')
@Controller('app-user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createAppUserDto: CreateAppUserDto) {
    const result = await this.appUserService.create(createAppUserDto)
    return plainToClass(AppUser, result, { excludePrefixes: ['password'] })
  }

  @UseGuards(AppUserGuard, RolesGuard)
  @Roles(RoleName.USER, RoleName.ADMIN)
  @Permissions(0)
  @Get()
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): AppUser {
    const result = this.appUserService.findAll()
    return plainToClass(AppUser, result, { excludePrefixes: ['password'] })
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    const result = this.appUserService.findById(id)
    return plainToClass(AppUser, result, { excludePrefixes: ['password'] })
  }

  @Get('one')
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Body() findAppUserDto: FindAppUserDto) {
    const result = this.appUserService.findOne(findAppUserDto)
    return plainToClass(AppUser, result, { excludePrefixes: ['password'] })
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAppUserDto: UpdateAppUserDto) {
    return this.appUserService.update(id, updateAppUserDto)
  }

  @Delete('soft/:id')
  @ApiResponse({ status: 201, description: 'successfully archived.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.appUserService.softDelete(id)
  }

  @Patch('restore/:id')
  @ApiResponse({ status: 201, description: 'successfully restored.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.appUserService.restore(id)
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'successfully removed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appUserService.remove(id)
  }
}
