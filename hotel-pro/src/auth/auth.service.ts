import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private usersService: UsersService) { }

    async validateUser(email: string, password?: string): Promise<any> {

        const user = await this.usersService.getUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email };

        const userData = await this.usersService.getUserByEmail(user.email)

        if (userData) {
            return {
                userData,
                access_token: this.jwtService.sign(payload),
            }
        } else {
            throw new NotFoundException('User not found')
        }
    }
}
