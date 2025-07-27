import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmRepositoryModule } from './common/infrastructure/database/typeorm/type-orm.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { StudentService } from './module/student/student.service';
import { TransactionModule } from './common/infrastructure/transaction/transaction.module';
import { TeacherModule } from './module/teacher/teacher.module';
import { CourseModule } from './module/course/course.module';
import { ApplyCourseOrmEntity } from './common/infrastructure/database/typeorm/entities/apply-course.orm';
@Module({
  imports: [
    TypeOrmRepositoryModule,
    TransactionModule,
    AuthModule,
    TeacherModule,
    CourseModule,
    ApplyCourseOrmEntity,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AppService,
    StudentService,
  ],
  exports: [],
})
export class AppModule {}
