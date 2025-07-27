import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserOrmEntity } from './entities/user.orm';
import { UserSeederService } from './seeders/seeder.service';
import { UsersSeeder } from './seeders/user.seed';
import { TransactionModule } from '../../transaction/transaction.module';
import { StudentOrmEntity } from './entities/student.orm';
import { StudentEducationOrmEntity } from './entities/student-education.orm';
import { TeacherOrmEntity } from './entities/teacher.orm';
import { CourseOrmEntity } from './entities/coures.orm';
import { CourseCategoryOrmEntity } from './entities/course_categories.orm';
import { ApplyCourseOrmEntity } from './entities/apply-course.orm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TransactionModule, // ນຳໃຊ້ TransactionModule ສໍາລັບ TransactionManager
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: any) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [
          UserOrmEntity,
          StudentOrmEntity,
          StudentEducationOrmEntity,
          TeacherOrmEntity,
          CourseOrmEntity,
          CourseCategoryOrmEntity,
          ApplyCourseOrmEntity,
        ],
        subscribers: [],
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
        logging: configService.getOrThrow('DB_LOGGING') === 'true',
        migrationsTableName: 'migrations',
      }),
    }),
    TypeOrmModule.forFeature([
      UserOrmEntity,
      StudentOrmEntity,
      StudentEducationOrmEntity,
      TeacherOrmEntity,
      CourseOrmEntity,
      CourseCategoryOrmEntity,
      ApplyCourseOrmEntity,
    ]),
  ],
  exports: [TypeOrmModule],
  providers: [UserSeederService, UsersSeeder],
})
export class TypeOrmRepositoryModule {}
