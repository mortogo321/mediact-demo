'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { shiftAssignmentsApi, leaveRequestsApi } from '@/lib/api';
import { isAuthenticated, isNurse } from '@/lib/auth';
import { ShiftAssignment } from '@/types';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export default function NurseDashboard() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ShiftAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<ShiftAssignment | null>(null);
  const [leaveReason, setLeaveReason] = useState('');

  useEffect(() => {
    if (!isAuthenticated() || !isNurse()) {
      router.push('/login');
      return;
    }
    loadSchedule();
  }, [router]);

  const loadSchedule = async () => {
    try {
      const response = await shiftAssignmentsApi.getMySchedule();
      setSchedule(response.data);
    } catch (error) {
      console.error('Failed to load schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLeave = (assignment: ShiftAssignment) => {
    setSelectedAssignment(assignment);
    setLeaveReason('');
    setShowLeaveModal(true);
  };

  const submitLeaveRequest = async () => {
    if (!selectedAssignment) return;

    try {
      await leaveRequestsApi.create({
        shift_assignment_id: selectedAssignment.id,
        reason: leaveReason,
      });
      setShowLeaveModal(false);
      loadSchedule();
      alert('ส่งคำขอลาสำเร็จ');
    } catch (error: any) {
      alert(error.response?.data?.message || 'ส่งคำขอลาไม่สำเร็จ');
    }
  };

  const getStatusBadge = (leaveRequest: any) => {
    if (!leaveRequest) return null;

    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };

    const statusText = {
      pending: 'รออนุมัติ',
      approved: 'อนุมัติ',
      rejected: 'ไม่อนุมัติ',
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[leaveRequest.status as keyof typeof statusColors]}`}>
        {statusText[leaveRequest.status as keyof typeof statusText]}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout title="ตารางเวรของฉัน">
        <div className="text-center py-12">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title="ตารางเวรของฉัน">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">เวรทำงานของคุณ</h2>
        </div>

        {schedule.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            ยังไม่มีเวรที่ได้รับมอบหมาย
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    เวลาเริ่ม
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    เวลาสิ้นสุด
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule.map((assignment) => {
                  const leaveRequest = assignment.leave_requests?.[0];
                  const hasLeaveRequest = !!leaveRequest;

                  return (
                    <tr key={assignment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(assignment.shift.date), 'dd MMMM yyyy', { locale: th })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assignment.shift.start_time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assignment.shift.end_time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {hasLeaveRequest ? getStatusBadge(leaveRequest) : (
                          <span className="text-green-600">ปกติ</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {!hasLeaveRequest ? (
                          <button
                            onClick={() => handleRequestLeave(assignment)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            ขอลา
                          </button>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">ขออนุมัติลา</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                วันที่: {selectedAssignment && format(new Date(selectedAssignment.shift.date), 'dd MMMM yyyy', { locale: th })}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                เวลา: {selectedAssignment?.shift.start_time} - {selectedAssignment?.shift.end_time}
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เหตุผลการลา
              </label>
              <textarea
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="กรุณาระบุเหตุผล..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={submitLeaveRequest}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                ส่งคำขอ
              </button>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}