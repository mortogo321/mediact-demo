import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/user.dart';

class AuthService extends ChangeNotifier {
  User? _user;
  String? _token;

  User? get user => _user;
  String? get token => _token;
  bool get isAuthenticated => _token != null;

  Future<bool> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('access_token');
    final userJson = prefs.getString('user');

    if (_token != null && userJson != null) {
      _user = User.fromJson(json.decode(userJson));
      return true;
    }

    return false;
  }

  Future<void> saveAuth(String token, User user) async {
    _token = token;
    _user = user;

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('access_token', token);
    await prefs.setString('user', json.encode(user.toJson()));

    notifyListeners();
  }

  Future<void> logout() async {
    _token = null;
    _user = null;

    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('access_token');
    await prefs.remove('user');

    notifyListeners();
  }
}