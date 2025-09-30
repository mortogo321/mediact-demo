import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ShiftAssignment } from '../shift-assignments/shift-assignment.entity';
import { User } from '../users/user.entity';

export enum LeaveRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  shift_assignment_id: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: LeaveRequestStatus,
    default: LeaveRequestStatus.PENDING,
  })
  status: LeaveRequestStatus;

  @Column({ nullable: true })
  approved_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => ShiftAssignment, assignment => assignment.leave_requests)
  @JoinColumn({ name: 'shift_assignment_id' })
  shift_assignment: ShiftAssignment;

  @ManyToOne(() => User, user => user.approved_leave_requests)
  @JoinColumn({ name: 'approved_by' })
  approved_by_user: User;
}