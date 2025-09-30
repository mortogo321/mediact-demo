import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest, LeaveRequestStatus } from './leave-request.entity';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestsRepository: Repository<LeaveRequest>,
  ) {}

  async create(createLeaveRequestDto: CreateLeaveRequestDto, userId: number): Promise<LeaveRequest> {
    // Check if leave request already exists for this shift assignment
    const existing = await this.leaveRequestsRepository.findOne({
      where: {
        shift_assignment_id: createLeaveRequestDto.shift_assignment_id,
      },
    });

    if (existing) {
      throw new BadRequestException('Leave request already exists for this shift');
    }

    const leaveRequest = this.leaveRequestsRepository.create({
      ...createLeaveRequestDto,
      status: LeaveRequestStatus.PENDING,
    });

    return this.leaveRequestsRepository.save(leaveRequest);
  }

  async findAll(status?: LeaveRequestStatus): Promise<LeaveRequest[]> {
    const query = this.leaveRequestsRepository
      .createQueryBuilder('leave_request')
      .leftJoinAndSelect('leave_request.shift_assignment', 'shift_assignment')
      .leftJoinAndSelect('shift_assignment.user', 'user')
      .leftJoinAndSelect('shift_assignment.shift', 'shift')
      .leftJoinAndSelect('leave_request.approved_by_user', 'approved_by_user');

    if (status) {
      query.where('leave_request.status = :status', { status });
    }

    return query.orderBy('leave_request.created_at', 'DESC').getMany();
  }

  async updateStatus(id: number, updateDto: UpdateLeaveRequestDto, approvedBy: number): Promise<LeaveRequest> {
    const leaveRequest = await this.leaveRequestsRepository.findOne({
      where: { id },
      relations: ['shift_assignment', 'shift_assignment.shift', 'shift_assignment.user'],
    });

    if (!leaveRequest) {
      throw new NotFoundException('Leave request not found');
    }

    if (leaveRequest.status !== LeaveRequestStatus.PENDING) {
      throw new BadRequestException('Leave request has already been processed');
    }

    leaveRequest.status = updateDto.status;
    leaveRequest.approved_by = approvedBy;

    return this.leaveRequestsRepository.save(leaveRequest);
  }
}