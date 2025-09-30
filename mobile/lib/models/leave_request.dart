class LeaveRequest {
  final int id;
  final int shiftAssignmentId;
  final String? reason;
  final String status; // pending, approved, rejected
  final DateTime createdAt;

  LeaveRequest({
    required this.id,
    required this.shiftAssignmentId,
    this.reason,
    required this.status,
    required this.createdAt,
  });

  factory LeaveRequest.fromJson(Map<String, dynamic> json) {
    return LeaveRequest(
      id: json['id'],
      shiftAssignmentId: json['shift_assignment_id'],
      reason: json['reason'],
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  bool get isPending => status == 'pending';
  bool get isApproved => status == 'approved';
  bool get isRejected => status == 'rejected';
}