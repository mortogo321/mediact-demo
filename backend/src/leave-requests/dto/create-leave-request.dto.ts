import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeaveRequestDto {
  @ApiProperty({ example: 1, description: 'Shift assignment ID to request leave for' })
  @IsInt()
  @IsNotEmpty()
  shift_assignment_id: number;

  @ApiProperty({ example: 'Medical appointment', description: 'Reason for leave', required: false })
  @IsString()
  @IsOptional()
  reason?: string;
}