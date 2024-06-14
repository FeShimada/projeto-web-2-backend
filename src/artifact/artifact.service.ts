import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArtifactDto } from './dto/artifact.dto';

@Injectable()
export class ArtifactService {

    constructor(private prisma: PrismaService) { }

    async create(dto: CreateArtifactDto) {
        const { name, description, activityId } = dto;

        const activity = await this.prisma.activity.findUnique({ where: { id: activityId } });
        if (!activity) throw new Error('User not found');

        const createdArtifact = await this.prisma.artifact.create({
            data: {
                name: name,
                description: description,
                activity: {
                    connect: {
                        id: activityId
                    }
                },
            },
            include: {
                activity: true,
            },
        });

        return createdArtifact;
    }
}
