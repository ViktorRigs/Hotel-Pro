import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService,
		private readonly usersService: UsersService) { }

	//@UseGuards(AuthGuard('jwt'))
	@Post('login')
	async login(@Body() req) {
		return this.authService.login(req);
	}

	@Post('register')
	async register(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
		return await this.usersService.registerUser(userData);
	}
}
