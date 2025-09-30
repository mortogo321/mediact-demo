import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShiftAssignment } from './shift-assignment.entity';
import { ShiftAssignmentsService } from './shift-assignments.service';
import { ShiftAssignmentsController, MyScheduleController } from './shift-assignments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShiftAssignment])],
  controllers: [ShiftAssignmentsController, MyScheduleController],
  providers: [ShiftAssignmentsService],
  exports: [ShiftAssignmentsService],
})
export class ShiftAssignmentsModule {}