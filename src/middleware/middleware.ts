import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            const user = await this.authService.validateToken(token);
            if (user) {
                req.user = {
                    email: user.email,
                    role: user.role,
                };
            }
        }

        next();
    }
}
