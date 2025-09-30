import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Shift } from '../shifts/shift.entity';
import { LeaveRequest } from '../leave-requests/leave-request.entity';

@Entity('shift_assignments')
export class ShiftAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  shift_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.shift_assignments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Shift, shift => shift.shift_assignments)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @OneToMany(() => LeaveRequest, leaveRequest => leaveRequest.shift_assignment)
  leave_requests: LeaveRequest[];
}