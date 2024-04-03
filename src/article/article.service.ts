import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto, EditArticleAuthorDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) {}

    async getByUser(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { articles: true }, 
        });

        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        return user.articles;
    }

    async getById(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id: id },
            include: { authors: true }, 
        });

        if (!article) {
            throw new Error(`article with id ${id} not found`);
        }

        return article;
    }

    async create(dto: CreateArticleDto) {
        const { title, summary, pdfLink, authors } = dto;

        const createdArticle = await this.prisma.article.create({
            data: {
                title: title,
                summary: summary,
                pdfLink: pdfLink,
                authors: { 
                    connect: [...authors]
                },
                score1: null,
                score2: null
            },
            include: { authors: true } 
        });

        return createdArticle;
    }

    async edit(dto: EditArticleAuthorDto) {
        const { title, summary, pdfLink, authors, id } = dto;

        const existingArticle = await this.prisma.article.findUnique({
            where: { id },
            include: { authors: true }
        });
        
        if (!existingArticle) {
            throw new DOMException(`Article with id ${id} not found`);
        }

        const authorsToDisconnect = existingArticle.authors.filter(author => !authors.map(author => author.id).includes(author.id)).map(author => ({ id: author.id }));

        console.log(authorsToDisconnect)

        const updatedArticle = await this.prisma.article.update({
            where: { id },
            data: {
                title: title,
                summary: summary,
                pdfLink: pdfLink,
                authors: { 
                    connect: [...authors],
                    disconnect: authorsToDisconnect
                },  
                score1: null,
                score2: null
            },
            include: { authors: true } 
        });

        return updatedArticle;
    }

    async delete(id: number) {
        const existingArticle = await this.prisma.article.findUnique({
            where: { id },
        });
        
        if (!existingArticle) {
            throw new DOMException(`Article with id ${id} not found`);
        }

        await this.prisma.article.delete({
            where: { id },
        });

    }

}
