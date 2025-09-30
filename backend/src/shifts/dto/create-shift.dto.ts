import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty({ example: '2025-10-15', description: 'Shift date (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '08:00:00', description: 'Shift start time (HH:MM:SS)' })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({ example: '16:00:00', description: 'Shift end time (HH:MM:SS)' })
  @IsString()
  @IsNotEmpty()
  end_time: string;
}