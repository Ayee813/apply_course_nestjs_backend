import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create.dto';
import { UpdateTeacherDto } from './dto/update.dto';
import { TeacherOrmEntity } from 'src/common/infrastructure/database/typeorm/entities/teacher.orm';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly _teacherService: TeacherService) {}

  @Post('create-teacher')
  async createTeacher(
    @Body() body: CreateTeacherDto,
  ): Promise<TeacherOrmEntity> {
    return await this._teacherService.createTeacher(body);
  }

  @Put('update-teacher/:id')
  async updateTeacher(
    @Param('id') id: number,
    @Body() body: UpdateTeacherDto,
  ): Promise<TeacherOrmEntity> {
    return await this._teacherService.updateTeacher(id, body);
  }
  @Get('get-all')
  async getAllTeacher(): Promise<TeacherOrmEntity[]> {
    return await this._teacherService.getAllTeacher();
  }
}
