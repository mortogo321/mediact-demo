import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('shifts')
@ApiBearerAuth('JWT-auth')
@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @Roles(UserRole.HEAD_NURSE)
  @ApiOperation({ summary: 'Create new shift (Head Nurse only)' })
  @ApiResponse({ status: 201, description: 'Shift created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Head Nurse role required' })
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto);
  }

  @Get()
  @Roles(UserRole.HEAD_NURSE)
  @ApiOperation({ summary: 'Get all shifts (Head Nurse only)' })
  @ApiQuery({ name: 'start_date', required: false, example: '2025-10-01' })
  @ApiQuery({ name: 'end_date', required: false, example: '2025-10-31' })
  @ApiResponse({ status: 200, description: 'List of shifts' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Query('start_date') startDate?: string, @Query('end_date') endDate?: string) {
    if (startDate && endDate) {
      return this.shiftsService.findByDateRange(startDate, endDate);
    }
    return this.shiftsService.findAll();
  }
}