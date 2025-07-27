import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TeacherOrmEntity } from './teacher.orm';
import { CourseCategoryOrmEntity } from './course_categories.orm';
import { ApplyCourseOrmEntity } from './apply-course.orm';

export enum CourseStatus {
  CLOSED = 'closed',
  OPEN = 'open',
}

@Entity('courses')
export class CourseOrmEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  // Fixed: Changed from 'int' to 'bigint' to match TeacherOrmEntity.id
  @Column({ type: 'bigint', nullable: false, unsigned: true })
  teacher_id: number;

  @ManyToOne(() => TeacherOrmEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeacherOrmEntity;

  // Fixed: Changed from 'int' to 'bigint' to match CourseCategoryOrmEntity.id
  @Column({ type: 'bigint', nullable: false, unsigned: true })
  category_id: number;

  @ManyToOne(() => CourseCategoryOrmEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CourseCategoryOrmEntity;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  max_student: number;

  @Column({ type: 'int' })
  duration_hours: number;

  @Column({ type: 'double' })
  price: number;

  @Column({ type: 'date' })
  registration_start_date: Date;

  @Column({ type: 'date' })
  registration_end_date: Date;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: CourseStatus })
  status: CourseStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date | null;

  @OneToMany(() => ApplyCourseOrmEntity, (apply) => apply.course)
  applyCourses: ApplyCourseOrmEntity[];
}
