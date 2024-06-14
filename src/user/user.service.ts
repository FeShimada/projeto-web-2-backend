import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateRoleDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import UserRole from 'src/helpers/UserRole';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {

    }

    // SignUp
    async create(dto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (user) throw new ConflictException('email duplicado');

        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10)
            }
        });

        const { password, ...obj } = newUser;

        return obj;
    }

    async getAll() {
        const allUsers = await this.prisma.user.findMany({
            include: { createdActivities: true, assignedActivities: true }
        });
        return allUsers;
    }

    // Utils
    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    // Utils
    async userRole(email: string): Promise<UserRole | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                "email": email
            },
            select: {
                "role": true
            }
        });

        return user?.["role"] as UserRole;
    }

    async updateRole(updateRoleDto: UpdateRoleDto) {

        const user = await this.findByEmail(updateRoleDto.email);
        if (!user) {
            throw new ConflictException('Usuário não encontrado.');
        }

        return await this.prisma.user.update({
            where: { email: updateRoleDto.email },
            data: { role: updateRoleDto.role }
        });
    }
}
