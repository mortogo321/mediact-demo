import { Controller, Get, Post, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ShiftAssignmentsService } from './shift-assignments.service';
import { CreateShiftAssignmentDto } from './dto/create-shift-assignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@ApiTags('shift-assignments')
@ApiBearerAuth('JWT-auth')
@Controller('shift-assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftAssignmentsController {
  constructor(private readonly shiftAssignmentsService: ShiftAssignmentsService) {}

  @Post()
  @Roles(UserRole.HEAD_NURSE)
  @ApiOperation({ summary: 'Assign shift to nurse (Head Nurse only)' })
  @ApiResponse({ status: 201, description: 'Shift assigned successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Assignment already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Head Nurse role required' })
  create(@Body() createShiftAssignmentDto: CreateShiftAssignmentDto) {
    return this.shiftAssignmentsService.create(createShiftAssignmentDto);
  }
}

@ApiTags('schedule')
@ApiBearerAuth('JWT-auth')
@Controller('my-schedule')
@UseGuards(JwtAuthGuard)
export class MyScheduleController {
  constructor(private readonly shiftAssignmentsService: ShiftAssignmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get personal schedule (Nurse)' })
  @ApiQuery({ name: 'start_date', required: false, example: '2025-10-01' })
  @ApiQuery({ name: 'end_date', required: false, example: '2025-10-31' })
  @ApiResponse({ status: 200, description: 'List of assigned shifts with leave request status' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getMySchedule(
    @Request() req,
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
  ) {
    return this.shiftAssignmentsService.findByUserId(req.user.id, startDate, endDate);
  }
}