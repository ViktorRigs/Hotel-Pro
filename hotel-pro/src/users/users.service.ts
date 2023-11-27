import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/entities/role.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id: id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email: email }, relations: ['role', 'bookings', 'bookings.hotelId'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updateUser(id: number, updateData: Partial<UserEntity>): Promise<UserEntity> {
        const user = await this.getUserById(id);
        this.userRepository.merge(user, updateData);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.softDelete({ id: id });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async registerUser(userData: Partial<UserEntity>): Promise<UserEntity> {
        const { email, password } = userData;
        if (!userData.role) {
            userData.role = { id: 15 } as RoleEntity
        } else {
            userData.role = { id: 14 } as RoleEntity
        }

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email address already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({ ...userData, password: hashedPassword });
        return await this.userRepository.save(user);
    }
}
