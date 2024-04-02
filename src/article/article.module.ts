import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ArticleService, PrismaService, JwtService],
  controllers: [ArticleController]
})
export class ArticleModule {}
