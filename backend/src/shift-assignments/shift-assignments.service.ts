import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShiftAssignment } from './shift-assignment.entity';
import { CreateShiftAssignmentDto } from './dto/create-shift-assignment.dto';

@Injectable()
export class ShiftAssignmentsService {
  constructor(
    @InjectRepository(ShiftAssignment)
    private shiftAssignmentsRepository: Repository<ShiftAssignment>,
  ) {}

  async create(createShiftAssignmentDto: CreateShiftAssignmentDto): Promise<ShiftAssignment> {
    // Check if assignment already exists
    const existing = await this.shiftAssignmentsRepository.findOne({
      where: {
        user_id: createShiftAssignmentDto.user_id,
        shift_id: createShiftAssignmentDto.shift_id,
      },
    });

    if (existing) {
      throw new BadRequestException('This shift is already assigned to this user');
    }

    const assignment = this.shiftAssignmentsRepository.create(createShiftAssignmentDto);
    return this.shiftAssignmentsRepository.save(assignment);
  }

  async findByUserId(userId: number, startDate?: string, endDate?: string): Promise<ShiftAssignment[]> {
    const query = this.shiftAssignmentsRepository
      .createQueryBuilder('assignment')
      .leftJoinAndSelect('assignment.shift', 'shift')
      .leftJoinAndSelect('assignment.leave_requests', 'leave_request')
      .where('assignment.user_id = :userId', { userId });

    if (startDate && endDate) {
      query
        .andWhere('shift.date >= :startDate', { startDate })
        .andWhere('shift.date <= :endDate', { endDate });
    }

    return query
      .orderBy('shift.date', 'ASC')
      .addOrderBy('shift.start_time', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<ShiftAssignment> {
    return this.shiftAssignmentsRepository.findOne({
      where: { id },
      relations: ['user', 'shift'],
    });
  }
}