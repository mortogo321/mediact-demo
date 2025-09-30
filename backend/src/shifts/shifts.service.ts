import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './shift.entity';
import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftsRepository: Repository<Shift>,
  ) {}

  async create(createShiftDto: CreateShiftDto): Promise<Shift> {
    const shift = this.shiftsRepository.create(createShiftDto);
    return this.shiftsRepository.save(shift);
  }

  async findAll(): Promise<Shift[]> {
    return this.shiftsRepository.find({
      order: { date: 'ASC', start_time: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Shift> {
    return this.shiftsRepository.findOne({ where: { id } });
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Shift[]> {
    return this.shiftsRepository
      .createQueryBuilder('shift')
      .where('shift.date >= :startDate', { startDate })
      .andWhere('shift.date <= :endDate', { endDate })
      .orderBy('shift.date', 'ASC')
      .addOrderBy('shift.start_time', 'ASC')
      .getMany();
  }
}