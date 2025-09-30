import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftAssignmentDto {
  @ApiProperty({ example: 2, description: 'Nurse user ID' })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 1, description: 'Shift ID' })
  @IsInt()
  @IsNotEmpty()
  shift_id: number;
}