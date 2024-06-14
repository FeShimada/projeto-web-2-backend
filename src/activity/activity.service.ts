import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssignActivityDto, CreateActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateActivityDto) {
        const { title, description, createdById } = dto;

        const user = await this.prisma.user.findUnique({ where: { id: createdById } });

        if (!user) {
            throw new Error('User not found');
        }

        const createdActivity = await this.prisma.activity.create({
            data: {
                title: title,
                description: description,
                createdBy: {
                    connect: {
                        id: createdById
                    }
                },
            },
            include: {
                createdBy: true,
            },
        });

        return createdActivity;
    }

    async assignActivity(dto: AssignActivityDto) {
        const { activityId, userId } = dto;

        const activity = await this.prisma.activity.findUnique({ where: { id: activityId }, });
        if (!activity) throw new Error('Activity not found');

        const user = await this.prisma.user.findUnique({ where: { id: userId }, });
        if (!user) throw new Error('User not found');

        const updatedActivity = await this.prisma.activity.update({
            where: { id: activityId },
            data: {
                assignedTo: {
                    connect: { id: userId },
                },
            },
            include: {
                createdBy: true,
                assignedTo: true
            },
        });

        return updatedActivity;
    }

    async getAll() {
        const allActivities = await this.prisma.activity.findMany({
            include: { createdBy: true, assignedTo: true, artifacts: true }
        });
        return allActivities;
    }
}
