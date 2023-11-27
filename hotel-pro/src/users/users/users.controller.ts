import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UsersService } from '../users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
		return this.usersService.createUser(userData);
	}

	@Get(':id')
	async getUserById(@Param('id') id: number): Promise<UserEntity> {
		return this.usersService.getUserById(id);
	}

	@Put(':id')
	async updateUser(
		@Param('id') id: number,
		@Body() updateData: Partial<UserEntity>,
	): Promise<UserEntity> {
		return this.usersService.updateUser(id, updateData);
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: number): Promise<void> {
		return this.usersService.deleteUser(id);
	}

	@Get()
	async getAllUsers(): Promise<UserEntity[]> {
		return this.usersService.getAllUsers();
	}
}
