import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';
import { LeaveRequestStatus } from './leave-request.entity';

@ApiTags('leave-requests')
@ApiBearerAuth('JWT-auth')
@Controller('leave-requests')
@UseGuards(JwtAuthGuard)
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) {}

  @Post()
  @Roles(UserRole.NURSE)
  @ApiOperation({ summary: 'Request leave for assigned shift (Nurse only)' })
  @ApiResponse({ status: 201, description: 'Leave request created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Leave request already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Nurse role required' })
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto, @Request() req) {
    return this.leaveRequestsService.create(createLeaveRequestDto, req.user.id);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.HEAD_NURSE)
  @ApiOperation({ summary: 'Get all leave requests (Head Nurse only)' })
  @ApiQuery({ name: 'status', enum: LeaveRequestStatus, required: false, example: 'pending' })
  @ApiResponse({ status: 200, description: 'List of leave requests' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Head Nurse role required' })
  findAll(@Query('status') status?: LeaveRequestStatus) {
    return this.leaveRequestsService.findAll(status);
  }

  @Patch(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.HEAD_NURSE)
  @ApiOperation({ summary: 'Approve or reject leave request (Head Nurse only)' })
  @ApiParam({ name: 'id', description: 'Leave request ID' })
  @ApiResponse({ status: 200, description: 'Leave request status updated' })
  @ApiResponse({ status: 400, description: 'Bad request - Already processed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Head Nurse role required' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateLeaveRequestDto,
    @Request() req,
  ) {
    return this.leaveRequestsService.updateStatus(+id, updateDto, req.user.id);
  }
}