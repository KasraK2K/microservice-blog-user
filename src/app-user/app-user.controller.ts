import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AppUserService } from './app-user.service';
import { CreateAppUserDto } from './dto/create-app-user.dto';
import { UpdateAppUserDto } from './dto/update-app-user.dto';

@ApiTags('app-user')
@Controller('app-user')
export class AppUserController {
  constructor(private readonly appUserService: AppUserService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createAppUserDto: CreateAppUserDto) {
    return this.appUserService.create(createAppUserDto);
  }

  @Get()
  findAll() {
    return this.appUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppUserDto: UpdateAppUserDto) {
    return this.appUserService.update(+id, updateAppUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appUserService.remove(+id);
  }
}
