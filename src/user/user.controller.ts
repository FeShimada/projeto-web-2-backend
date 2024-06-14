import { UserService } from './user.service';
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateRoleDto } from './dto/user.dto';
import { Request } from 'express';


@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {

   constructor(private userService: UserService) { }

   @UseGuards(JwtGuard)
   @Get()
   async getAll() {
      return await this.userService.getAll();
   }

   @UseGuards(JwtGuard)
   @Put('role')
   async updateRole(@Body() updateRoleDto: UpdateRoleDto) {
      return this.userService.updateRole(updateRoleDto);
   }

}
