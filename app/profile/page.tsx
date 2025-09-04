'use client';
import React, { useState } from 'react';

// ส่วนประกอบหลักของแอปพลิเคชัน
const App: React.FC = () => {
  // สถานะเพื่อเก็บข้อมูลผู้ใช้ที่สามารถแก้ไขได้
  const [userData, setUserData] = useState({
    name: 'สมชาย รักชาติ',
    email: 'somchai.r@example.com',
    password: 'password123', // ในการใช้งานจริง ไม่ควรเก็บรหัสผ่านในสถานะแบบนี้
  });

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ฟังก์ชันจัดการเมื่อกดปุ่มบันทึกข้อมูล
  const handleSave = () => {
    // ในการใช้งานจริง จะส่งข้อมูลนี้ไปยัง API เพื่ออัปเดตข้อมูลผู้ใช้
    console.log('ข้อมูลผู้ใช้ที่ถูกบันทึก:', userData);
    alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
  };

  // ฟังก์ชันจัดการเมื่อกดปุ่มกลับไปหน้า Dashboard
  const handleGoToDashboard = () => {
    // ในการใช้งานจริง จะใช้ React Router หรือวิธีอื่นเพื่อเปลี่ยนเส้นทางไปยัง /dashboard
    console.log('กำลังกลับไปที่หน้า /dashboard...');
    alert('กำลังกลับไปที่หน้า Dashboard...');
    // ตัวอย่างการเปลี่ยนเส้นทาง (ในแอปจริง): history.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-400 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">แก้ไขข้อมูลโปรไฟล์</h1>
        
        {/* ส่วนฟอร์มแก้ไขข้อมูล */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="กรอกชื่อ-นามสกุล"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="กรอกอีเมล"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* ส่วนปุ่มต่างๆ */}
        <div className="space-y-4">
          <button
            onClick={handleSave}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          >
            บันทึก
          </button>
          <button
            onClick={handleGoToDashboard}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-full shadow-sm text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          >
            กลับไปที่ Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
