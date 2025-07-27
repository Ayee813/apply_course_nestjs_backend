/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './common/decorator/auth.decorator';
import { CurrentUser } from './common/decorator/user.decorator';
import { UserOrmEntity } from './common/infrastructure/database/typeorm/entities/user.orm';
import { CreateUserDto } from './module/user/dto/create.dto';
import { CreateStudentDto } from './module/student/dto/create.dto';
import { StudentOrmEntity } from './common/infrastructure/database/typeorm/entities/student.orm';
import { StudentService } from './module/student/student.service';
import { PaginationResponse } from './common/pagination/pagination.response';
import { UpdateStudentDto } from './module/student/dto/update.dto';
import { AddEducationDto } from './module/student/dto/add-profile.dto';
import { StudentEducationOrmEntity } from './common/infrastructure/database/typeorm/entities/student-education.orm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('login')
  async login(@Body() body: any): Promise<any> {
    return await this.authService.login(body);
  }

  @Get('user')
  async getUser(@CurrentUser() user: any): Promise<UserOrmEntity> {
    return await this.appService.getUser(user);
  }
  @Get('users')
  async getUsers(): Promise<UserOrmEntity[]> {
    return await this.appService.getUsers();
  }
  @Public()
  @Post('create-user')
  async register(@Body() body: CreateUserDto): Promise<UserOrmEntity> {
    return await this.authService.register(body);
  }

  @Put('update-user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<UserOrmEntity> {
    return await this.authService.updateUser(id, body);
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.authService.deleteUser(id);
  }
  @Post('register')
  async createStudent(
    @Body() body: CreateStudentDto,
  ): Promise<StudentOrmEntity> {
    return await this.studentService.createStudent(body);
  }
  @Get('students')
  async getAllStudent(
    @Query() query: any,
  ): Promise<PaginationResponse<StudentOrmEntity>> {
    return await this.studentService.getAllStudent(query);
  }

  @Put('students/:id')
  async updateStudent(
    @Param('id') id: number,
    @Body() body: UpdateStudentDto,
  ): Promise<any> {
    return await this.studentService.updateStudent(id, body);
  }
  //delete student

  @Delete('students/:id')
  async deleteStudent(@Param('id') id: number): Promise<any> {
    return await this.studentService.deleteStudent(id);
  }
  /**Update student profile */
  @Post('student/add-profile/:id')
  async addStudentProfile(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<any> {
    return await this.studentService.addStudentProfile(id, body);
  }

  //get all student profile
  @Get('student/profile')
  async getAllStudentProfile(@Query() query: any): Promise<any> {
    return await this.studentService.getAllStudentProfile(query);
  }
  @Put('students/update-profile/:id')
  async updateStudentProfile(
    @Param('id') id: number,
    @Body() body: AddEducationDto,
  ): Promise<StudentEducationOrmEntity> {
    return await this.studentService.updateStudentProfile(id, body);
  }

  @Delete('students/delete-profile/:id')
  async deleteStudentProfile(@Param('id') id: number): Promise<void> {
    return await this.studentService.deleteStudentProfile(id);
  }
}
