import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from './common/infrastructure/database/typeorm/entities/user.orm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  [x: string]: any;
  constructor(
    @InjectRepository(UserOrmEntity)
    private _userRepo: Repository<UserOrmEntity>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async getUser(user: any): Promise<UserOrmEntity> {
    const userEntity = await this._userRepo.findOne({
      where: { id: user.id },
    });
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }
    return userEntity;
  }
  async getUsers(): Promise<UserOrmEntity[]> {
    const users = await this._userRepo.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  }
}
