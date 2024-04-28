import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssignArticleToMeasurerDto, CreateUserDto, EditUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {

    }

    async create(dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(user) throw new ConflictException('email duplicado');

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10)
            }
        })

        const { password, ...obj } = newUser

        return obj;
    }

    async getById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if(user) {
            const { password, ...obj } = user
            return obj
        }
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async getAllAuthor() {
        const users = await this.prisma.user.findMany({
            where: {
                role: 0
            }
        })
        if(users) {
            return users
        }
    }

    async getAllMeasurer() {
        const users = await this.prisma.user.findMany({
            where: {
                role: 1
            }
        })
        if(users) {
            return users
        }
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            include: { articles: true }
        })
        if(users) {
            return users
        }
    }

    async delete(id: number) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id },
        });
        
        if (!existingUser) {
            throw new DOMException(`User with id ${id} not found`);
        }

        await this.prisma.user.delete({
            where: { id },
        });

    }

    async edit(dto: EditUserDto) {
        const { id, name, email, role } = dto;

        const existingUser = await this.prisma.user.findUnique({
            where: { id },
            include: { articles: true }
        });
        
        if (!existingUser) {
            throw new DOMException(`User with id ${id} not found`);
        }

        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                name: name,
                email: email,
                role: role
            },
            include: { articles: true } 
        });

        return updatedUser;
    }

    async assignArticleToMeasurer(dto: AssignArticleToMeasurerDto) {
        const { articles, id } = dto;

        const existingMeasurer = await this.prisma.user.findUnique({
            where: { id },
            include: { articles: true }
        });
        
        if (!existingMeasurer) {
            throw new DOMException(`Measurer with id ${id} not found`);
        }

        const updatedMeasurer = await this.prisma.user.update({
            where: { id, role: 1 },
            data: {
                articles: { 
                    connect: [...articles],
                },
            },
            include: { articles: true } 
        });

        return updatedMeasurer;
    }

}
