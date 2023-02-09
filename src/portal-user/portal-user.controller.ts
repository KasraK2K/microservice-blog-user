import { PortalUser } from './entities/portal-user.entity'
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { PortalUserService } from './portal-user.service'
import { CreatePortalUserDto } from './dto/create-portal-user.dto'
import { UpdatePortalUserDto } from './dto/update-portal-user.dto'
import { FindPortalUserDto } from './dto/find-portal-user.dto'
import { plainToClass } from 'class-transformer'

@ApiTags('portal-user')
@Controller('portal-user')
export class PortalUserController {
  constructor(private readonly portalUserService: PortalUserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createPortalUserDto: CreatePortalUserDto) {
    const result = await this.portalUserService.create(createPortalUserDto)
    return plainToClass(PortalUser, result, { excludePrefixes: ['password'] })
  }

  @Get()
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): PortalUser {
    const result = this.portalUserService.findAll()
    return plainToClass(PortalUser, result, { excludePrefixes: ['password'] })
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findById(@Param('id', ParseIntPipe) id: number) {
    const result = this.portalUserService.findById(id)
    return plainToClass(PortalUser, result, { excludePrefixes: ['password'] })
  }

  @Post('one')
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Body() findPortalUserDto: FindPortalUserDto) {
    const result = this.portalUserService.findOne(findPortalUserDto)
    return plainToClass(PortalUser, result, { excludePrefixes: ['password'] })
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePortalUserDto: UpdatePortalUserDto) {
    return this.portalUserService.update(id, updatePortalUserDto)
  }

  @Delete('soft/:id')
  @ApiResponse({ status: 201, description: 'successfully archived.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.portalUserService.softDelete(id)
  }

  @Patch('restore/:id')
  @ApiResponse({ status: 201, description: 'successfully restored.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.portalUserService.restore(id)
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'successfully removed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.portalUserService.remove(id)
  }
}
