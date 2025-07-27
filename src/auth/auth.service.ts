import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from 'src/common/infrastructure/database/typeorm/entities/user.orm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/module/user/dto/create.dto';
import { UpdateUserDto } from 'src/module/user/dto/update.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private _UserRepo: Repository<UserOrmEntity>,
    private _jwtService: JwtService,
  ) {}

  async login(body: any): Promise<any> {
    const result = await this._UserRepo.findOne({
      where: {
        email: body.email,
      },
    });

    if (!result) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      result.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      username: result.username,
      sub: result.id,
    };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }

  async register(body: CreateUserDto): Promise<UserOrmEntity> {
    const existingUser = await this._UserRepo.findOne({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = this._UserRepo.create({
      email: body.email,
      username: body.username,
      password: hashedPassword,
    });

    const savedUser = await this._UserRepo.save(newUser);
    return savedUser;
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<UserOrmEntity> {
    const user = await this._UserRepo.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    Object.assign(user, body);
    return await this._UserRepo.save(user);
  }
  async deleteUser(id: number): Promise<void> {
    const user = await this._UserRepo.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    await this._UserRepo.remove(user);
  }
}
