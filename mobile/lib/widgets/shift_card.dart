import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/schedule.dart';

class ShiftCard extends StatelessWidget {
  final Schedule schedule;
  final VoidCallback onRequestLeave;

  const ShiftCard({
    super.key,
    required this.schedule,
    required this.onRequestLeave,
  });

  @override
  Widget build(BuildContext context) {
    final leaveRequest = schedule.activeLeaveRequest;
    final hasLeaveRequest = schedule.hasLeaveRequest;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  DateFormat('dd MMM yyyy', 'th').format(schedule.shift.date),
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                if (hasLeaveRequest) _buildStatusBadge(leaveRequest!.status),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.access_time, size: 16, color: Colors.grey),
                const SizedBox(width: 4),
                Text(
                  '${schedule.shift.startTime} - ${schedule.shift.endTime}',
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                ),
              ],
            ),
            if (hasLeaveRequest && leaveRequest!.reason != null) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.comment, size: 16, color: Colors.grey),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        leaveRequest.reason!,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ),
            ],
            if (!hasLeaveRequest) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: onRequestLeave,
                  icon: const Icon(Icons.event_busy, size: 18),
                  label: const Text('ขอลา'),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    Color bgColor;
    Color textColor;
    String text;

    switch (status) {
      case 'pending':
        bgColor = Colors.orange[100]!;
        textColor = Colors.orange[900]!;
        text = 'รออนุมัติ';
        break;
      case 'approved':
        bgColor = Colors.green[100]!;
        textColor = Colors.green[900]!;
        text = 'อนุมัติ';
        break;
      case 'rejected':
        bgColor = Colors.red[100]!;
        textColor = Colors.red[900]!;
        text = 'ไม่อนุมัติ';
        break;
      default:
        bgColor = Colors.grey[100]!;
        textColor = Colors.grey[900]!;
        text = status;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: textColor,
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}