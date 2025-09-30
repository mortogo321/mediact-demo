import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ShiftAssignment } from '../shift-assignments/shift-assignment.entity';
import { LeaveRequest } from '../leave-requests/leave-request.entity';

export enum UserRole {
  NURSE = 'nurse',
  HEAD_NURSE = 'head_nurse',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ShiftAssignment, assignment => assignment.user)
  shift_assignments: ShiftAssignment[];

  @OneToMany(() => LeaveRequest, leaveRequest => leaveRequest.approved_by_user)
  approved_leave_requests: LeaveRequest[];
}