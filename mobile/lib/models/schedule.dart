import 'shift.dart';
import 'leave_request.dart';

class Schedule {
  final int id;
  final int userId;
  final int shiftId;
  final Shift shift;
  final List<LeaveRequest>? leaveRequests;

  Schedule({
    required this.id,
    required this.userId,
    required this.shiftId,
    required this.shift,
    this.leaveRequests,
  });

  factory Schedule.fromJson(Map<String, dynamic> json) {
    return Schedule(
      id: json['id'],
      userId: json['user_id'],
      shiftId: json['shift_id'],
      shift: Shift.fromJson(json['shift']),
      leaveRequests: json['leave_requests'] != null
          ? (json['leave_requests'] as List)
              .map((lr) => LeaveRequest.fromJson(lr))
              .toList()
          : null,
    );
  }

  LeaveRequest? get activeLeaveRequest {
    if (leaveRequests == null || leaveRequests!.isEmpty) return null;
    return leaveRequests!.first;
  }

  bool get hasLeaveRequest => leaveRequests != null && leaveRequests!.isNotEmpty;
}