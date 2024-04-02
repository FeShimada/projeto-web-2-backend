import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
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

}
