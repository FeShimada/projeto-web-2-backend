
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "src/user/user.service";

/*

Permissions

           | Create Activities | Create Artifacts | Assign Activities
-----------|-------------------|------------------|------------------|
Master     |        o          |      o           |       o          |     
Creator    |        o          |      o           |       x          |       
Assigner   |        x          |      x           |       o          |       

*/


enum UserRole {
    Master = "Master",
    Creator = "Creator",
    Assigner = "Assigner"
}

export class UnauthorizedAccessException extends Error {
    constructor(message?: string) {
        super(message || 'Acesso não autorizado');
        this.name = 'UnauthorizedAccessException';
    }
}

export async function checkActivityCreationPermission(userService: UserService, email: string): Promise<void> {
    const userRole = await userService.userRole(email);

    if (userRole !== UserRole.Master && userRole !== UserRole.Creator) {
        throw new UnauthorizedAccessException();
    }
}

export async function checkArtifactCreationPermission(userService: UserService, email: string): Promise<void> {
    const userRole = await userService.userRole(email);

    if (userRole !== UserRole.Master && userRole !== UserRole.Creator) {
        throw new HttpException('Acesso não autorizado', HttpStatus.UNAUTHORIZED);
    }
}

export async function checkAssignActivityPermission(userService: UserService, email: string): Promise<void> {
    const userRole = await userService.userRole(email);

    if (userRole !== UserRole.Master && userRole !== UserRole.Assigner) {
        throw new HttpException('Acesso não autorizado', HttpStatus.UNAUTHORIZED);
    }
}

export default UserRole;
