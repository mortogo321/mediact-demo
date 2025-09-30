'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { leaveRequestsApi } from '@/lib/api';
import { LeaveRequest } from '@/types';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export default function LeaveRequestsPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaveRequests();
  }, [filter]);

  const loadLeaveRequests = async () => {
    try {
      const status = filter === 'all' ? undefined : filter;
      const response = await leaveRequestsApi.getAll(status);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Failed to load leave requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    if (!confirm('คุณต้องการอนุมัติคำขอลานี้หรือไม่?')) return;

    try {
      await leaveRequestsApi.updateStatus(id, 'approved');
      alert('อนุมัติคำขอลาสำเร็จ');
      loadLeaveRequests();
    } catch (error: any) {
      alert(error.response?.data?.message || 'อนุมัติไม่สำเร็จ');
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm('คุณต้องการปฏิเสธคำขอลานี้หรือไม่?')) return;

    try {
      await leaveRequestsApi.updateStatus(id, 'rejected');
      alert('ปฏิเสธคำขอลาสำเร็จ');
      loadLeaveRequests();
    } catch (error: any) {
      alert(error.response?.data?.message || 'ปฏิเสธไม่สำเร็จ');
    }
  };

  const getStatusBadge = (status: string) => {
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
      <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[status as keyof typeof statusColors]}`}>
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  if (loading) {
    return (
      <Layout title="คำขอลา">
        <div className="text-center py-12">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout title="จัดการคำขอลา">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">คำขอลาทั้งหมด</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 text-sm rounded ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                รออนุมัติ
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-3 py-1 text-sm rounded ${filter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                อนุมัติแล้ว
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-3 py-1 text-sm rounded ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                ปฏิเสธ
              </button>
            </div>
          </div>
        </div>

        {leaveRequests.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            ไม่มีคำขอลา
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    พยาบาล
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วันที่เวร
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    เวลา
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    เหตุผล
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
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.shift_assignment?.user?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.shift_assignment?.shift &&
                        format(new Date(request.shift_assignment.shift.date), 'dd MMM yyyy', { locale: th })
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.shift_assignment?.shift &&
                        `${request.shift_assignment.shift.start_time} - ${request.shift_assignment.shift.end_time}`
                      }
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.reason || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {request.status === 'pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            อนุมัติ
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            ปฏิเสธ
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}