'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { shiftsApi } from '@/lib/api';

export default function CreateShiftPage() {
  const router = useRouter();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await shiftsApi.create({
        date,
        start_time: startTime,
        end_time: endTime,
      });
      alert('สร้างเวรสำเร็จ');
      router.push('/head-nurse/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'สร้างเวรไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const quickShifts = [
    { label: 'กะเช้า', start: '08:00:00', end: '16:00:00' },
    { label: 'กะบ่าย', start: '16:00:00', end: '00:00:00' },
    { label: 'กะดึก', start: '00:00:00', end: '08:00:00' },
  ];

  return (
    <Layout title="สร้างเวรใหม่">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                วันที่
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เลือกกะ (Quick Select)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickShifts.map((shift) => (
                  <button
                    key={shift.label}
                    type="button"
                    onClick={() => {
                      setStartTime(shift.start);
                      setEndTime(shift.end);
                    }}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    {shift.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  เวลาเริ่ม
                </label>
                <input
                  id="startTime"
                  type="time"
                  step="1"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value + ':00')}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                  เวลาสิ้นสุด
                </label>
                <input
                  id="endTime"
                  type="time"
                  step="1"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value + ':00')}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'กำลังสร้าง...' : 'สร้างเวร'}
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
        </div>
      </div>
    </Layout>
  );
}