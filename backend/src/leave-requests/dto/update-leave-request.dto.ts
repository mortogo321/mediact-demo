import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LeaveRequestStatus } from '../leave-request.entity';

export class UpdateLeaveRequestDto {
  @ApiProperty({
    enum: LeaveRequestStatus,
    example: 'approved',
    description: 'New status: approved or rejected'
  })
  @IsEnum(LeaveRequestStatus)
  @IsNotEmpty()
  status: LeaveRequestStatus;
}