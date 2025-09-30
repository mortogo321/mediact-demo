class Shift {
  final int id;
  final DateTime date;
  final String startTime;
  final String endTime;

  Shift({
    required this.id,
    required this.date,
    required this.startTime,
    required this.endTime,
  });

  factory Shift.fromJson(Map<String, dynamic> json) {
    return Shift(
      id: json['id'],
      date: DateTime.parse(json['date']),
      startTime: json['start_time'],
      endTime: json['end_time'],
    );
  }
}