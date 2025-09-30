import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user.dart';
import '../models/schedule.dart';

class ApiService {
  static const String baseUrl = 'http://10.0.2.2:8000'; // Android emulator localhost
  // Use 'http://localhost:8000' for iOS simulator
  // Use your actual IP:8000 for physical devices

  late final Dio _dio;

  ApiService() {
    _dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('access_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
    ));
  }

  // Auth
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post('/auth/login', data: {
        'email': email,
        'password': password,
      });
      return {
        'token': response.data['access_token'],
        'user': User.fromJson(response.data['user']),
      };
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Schedule
  Future<List<Schedule>> getMySchedule({String? startDate, String? endDate}) async {
    try {
      final response = await _dio.get('/my-schedule', queryParameters: {
        if (startDate != null) 'start_date': startDate,
        if (endDate != null) 'end_date': endDate,
      });
      return (response.data as List)
          .map((json) => Schedule.fromJson(json))
          .toList();
    } catch (e) {
      throw _handleError(e);
    }
  }

  // Leave Request
  Future<void> requestLeave(int shiftAssignmentId, String? reason) async {
    try {
      await _dio.post('/leave-requests', data: {
        'shift_assignment_id': shiftAssignmentId,
        'reason': reason,
      });
    } catch (e) {
      throw _handleError(e);
    }
  }

  String _handleError(dynamic error) {
    if (error is DioException) {
      if (error.response != null) {
        return error.response!.data['message'] ?? 'เกิดข้อผิดพลาด';
      }
      return 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์';
    }
    return 'เกิดข้อผิดพลาด';
  }
}