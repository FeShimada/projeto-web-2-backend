import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { UserService } from 'src/user/user.service';

@Module({
    providers: [ActivityService, PrismaService, JwtService, UserService],
    controllers: [ActivityController]
})
export class ActivityModule { }
