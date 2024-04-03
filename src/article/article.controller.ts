import { Body, Controller, Get, Param, Post, UseGuards, Put, Delete } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ArticleService } from './article.service';
import { CreateArticleDto, EditArticleAuthorDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {

    constructor(private articleService: ArticleService) {}

    @UseGuards(JwtGuard)
    @Get('user/:id')
    async getByUser(@Param("id") id: number) {
       return await this.articleService.getByUser(id)
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getById(@Param("id") id: number) {
       return await this.articleService.getById(id)
    }

    @UseGuards(JwtGuard)
    @Post('create')
    async create(@Body() dto: CreateArticleDto) {
       return await this.articleService.create(dto)
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@Param("id") id: number) {
       return await this.articleService.delete(id)
    }

    @UseGuards(JwtGuard)
    @Put('edit/author')
    async editAuthor(@Body() dto: EditArticleAuthorDto) {
       return await this.articleService.edit(dto)
    }
}
