import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get('author')
    async getAllAuthor() {
       return await this.userService.getAllAuthor()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async login(@Param("id") id: number) {
       return await this.userService.getById(id)
    }
}
