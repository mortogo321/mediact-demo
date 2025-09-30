'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { isAuthenticated, isHeadNurse } from '@/lib/auth';
import Link from 'next/link';

export default function HeadNurseDashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated() || !isHeadNurse()) {
      router.push('/login');
    }
  }, [router]);

  const menuItems = [
    {
      title: 'สร้างเวร',
      description: 'สร้างเวรทำงานใหม่',
      href: '/head-nurse/shifts/create',
      icon: '📅',
      color: 'bg-blue-500',
    },
    {
      title: 'จัดเวรพยาบาล',
      description: 'มอบหมายเวรให้กับพยาบาล',
      href: '/head-nurse/shifts/assign',
      icon: '👥',
      color: 'bg-green-500',
    },
    {
      title: 'คำขอลา',
      description: 'อนุมัติหรือปฏิเสธคำขอลา',
      href: '/head-nurse/leave-requests',
      icon: '📋',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <Layout title="แดชบอร์ดหัวหน้าพยาบาล">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">ภาพรวมระบบ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">เวรทั้งหมด</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">-</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">พยาบาลที่ปฏิบัติงาน</p>
            <p className="text-2xl font-bold text-green-900 mt-1">-</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">คำขอลารออนุมัติ</p>
            <p className="text-2xl font-bold text-yellow-900 mt-1">-</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}