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
import { CourseService } from './course.service';
import { CreateCourseCategoryDto } from './dto/create.dto';
import { UpdateCourseCategoryDto } from './dto/update.dto';
import { GetAllCategoryDto } from './dto/query.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseOrmEntity } from 'src/common/infrastructure/database/typeorm/entities/coures.orm';
import { CourseCategoryOrmEntity } from 'src/common/infrastructure/database/typeorm/entities/course_categories.orm';
import { PaginationResponse } from 'src/common/pagination/pagination.response';

@Controller('course')
export class CourseController {
  constructor(private readonly _courseService: CourseService) {}
  @Get('get-all')
  async getAll(
    @Query() query: any,
  ): Promise<PaginationResponse<CourseOrmEntity>> {
    return await this._courseService.getAll(query);
  }

  /** CRUD Course */
  @Post('create-course')
  async createCourse(@Body() body: CreateCourseDto): Promise<CourseOrmEntity> {
    return await this._courseService.createCourse(body);
  }

  @Put('update-course/:id')
  async updateCourse(
    @Param('id') id: number,
    @Body() body: UpdateCourseDto,
  ): Promise<CourseOrmEntity> {
    return await this._courseService.updateCourse(id, body);
  }

  @Delete('delete-course/:id')
  async deleteCourse(@Param('id') id: number): Promise<void> {
    return await this._courseService.deleteCourse(id);
  }

  /** CRUD Course Category */
  @Get('categories')
  async getAllCategory(
    @Query() query: GetAllCategoryDto,
  ): Promise<PaginationResponse<CourseCategoryOrmEntity>> {
    return await this._courseService.getAllCategory(query);
  }

  @Post('create-category')
  async createCategory(
    @Body() body: CreateCourseCategoryDto,
  ): Promise<CourseCategoryOrmEntity> {
    return await this._courseService.createCategory(body);
  }

  @Put('update-category/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body: UpdateCourseCategoryDto,
  ): Promise<CourseCategoryOrmEntity> {
    return await this._courseService.updateCategory(id, body);
  }

  @Delete('delete-category/:id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    return await this._courseService.deleteCategory(id);
  }
  @Put('update-status/:id')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: { status: string },
  ): Promise<CourseOrmEntity> {
    return await this._courseService.updateStatus(id, body);
  }
}
