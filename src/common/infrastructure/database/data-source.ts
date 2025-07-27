import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserOrmEntity } from './typeorm/entities/user.orm';
import { StudentOrmEntity } from './typeorm/entities/student.orm';
import { StudentEducationOrmEntity } from './typeorm/entities/student-education.orm';
import { TeacherOrmEntity } from './typeorm/entities/teacher.orm';
import { CourseOrmEntity } from './typeorm/entities/coures.orm';
import { CourseCategoryOrmEntity } from './typeorm/entities/course_categories.orm';

config(); // ໂຫຼດຈາກ .env
export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'kingayee123',
  database: process.env.DB_NAME || 'nest_project',
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
  logging: Boolean(process.env.DB_LOGGING || false),
  entities: [
    UserOrmEntity,
    StudentOrmEntity,
    StudentEducationOrmEntity,
    TeacherOrmEntity,
    CourseOrmEntity,
    CourseCategoryOrmEntity,
  ],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations', // ຊື່ table ສຳຫຼັບເກັບ migrations
});
