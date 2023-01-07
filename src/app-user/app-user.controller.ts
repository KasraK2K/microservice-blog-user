import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
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
    console.log({ createAppUserDto });
    return this.appUserService.create(createAppUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.appUserService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'successful.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.appUserService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: 'successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAppUserDto: UpdateAppUserDto) {
    return this.appUserService.update(+id, updateAppUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: 'successfully removed.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.appUserService.remove(+id);
  }
}
