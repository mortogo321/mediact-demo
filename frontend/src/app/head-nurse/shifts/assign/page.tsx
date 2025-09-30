'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { shiftsApi, shiftAssignmentsApi } from '@/lib/api';
import { Shift, User } from '@/types';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import axios from 'axios';

export default function AssignShiftPage() {
  const router = useRouter();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [nurses, setNurses] = useState<User[]>([]);
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedNurse, setSelectedNurse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [shiftsRes, usersRes] = await Promise.all([
        shiftsApi.getAll(),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }),
      ]);

      setShifts(shiftsRes.data);
      // Filter only nurses
      const nurseUsers = usersRes.data.filter((u: User) => u.role === 'nurse');
      setNurses(nurseUsers);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await shiftAssignmentsApi.create({
        user_id: parseInt(selectedNurse),
        shift_id: parseInt(selectedShift),
      });
      alert('จัดเวรสำเร็จ');
      setSelectedShift('');
      setSelectedNurse('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'จัดเวรไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="จัดเวรพยาบาล">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="shift" className="block text-sm font-medium text-gray-700 mb-2">
                เลือกเวร
              </label>
              <select
                id="shift"
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- เลือกเวร --</option>
                {shifts.map((shift) => (
                  <option key={shift.id} value={shift.id}>
                    {format(new Date(shift.date), 'dd MMM yyyy', { locale: th })} | {shift.start_time} - {shift.end_time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="nurse" className="block text-sm font-medium text-gray-700 mb-2">
                เลือกพยาบาล
              </label>
              <select
                id="nurse"
                value={selectedNurse}
                onChange={(e) => setSelectedNurse(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- เลือกพยาบาล --</option>
                {nurses.map((nurse) => (
                  <option key={nurse.id} value={nurse.id}>
                    {nurse.name} ({nurse.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'กำลังจัดเวร...' : 'จัดเวร'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              💡 <strong>คำแนะนำ:</strong> สร้างเวรก่อน จากนั้นจึงมอบหมายให้พยาบาล
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}