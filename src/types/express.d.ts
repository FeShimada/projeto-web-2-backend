import { UserRole } from 'src/helpers/UserRole'; // Adjust the import path as needed

declare global {
    namespace Express {
        interface Request {
            user: {
                email: string;
                role: UserRole;
            };
        }
    }
}
