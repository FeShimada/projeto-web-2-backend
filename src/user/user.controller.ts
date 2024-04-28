import { Controller, Get, Param, UseGuards, Put, Body, Delete, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AssignArticleToMeasurerDto, CreateUserDto, EditUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {

   constructor(private userService: UserService) { }

   @UseGuards(JwtGuard)
   @Get('author')
   async getAllAuthor() {
      return await this.userService.getAllAuthor()
   }

   @UseGuards(JwtGuard)
   @Get('measurer')
   async getAllMeasurer() {
      return await this.userService.getAllMeasurer()
   }

   @UseGuards(JwtGuard)
   @Get('user')
   async getAllUser() {
      return await this.userService.getAllUsers()
   }

   @UseGuards(JwtGuard)
   @Put('user')
   async UpdateUser(@Body() dto: EditUserDto) {
      return await this.userService.edit(dto)
   }

   @UseGuards(JwtGuard)
   @Delete(':id')
   async DeleteUser(@Param("id") id: number) {
      return await this.userService.delete(id)
   }

   @UseGuards(JwtGuard)
   @Post('user')
   async CreateUser(@Body() dto: CreateUserDto) {
      return await this.userService.create(dto)
   }


   @UseGuards(JwtGuard)
   @Get(':id')
   async login(@Param("id") id: number) {
      return await this.userService.getById(id)
   }

   @UseGuards(JwtGuard)
   @Put('assign-article-to-measurer')
   async editAuthor(@Body() dto: AssignArticleToMeasurerDto) {
      return await this.userService.assignArticleToMeasurer(dto)
   }
}
