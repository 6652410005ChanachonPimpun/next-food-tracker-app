import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import foodtracker from './images/foodtracker.jpg'

const HomePage = () => {
  return (
    // คอนเทนเนอร์หลักที่ใช้ gradient สีสำหรับพื้นหลัง และจัดองค์ประกอบให้อยู่กึ่งกลาง
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-slate-100">
      
      {/* ส่วนหัวข้อหลัก */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-extrabold md:text-6xl">
          Welcome to Realer food tracker
        </h1>
        <p className="text-xl italic font-medium md:text-2xl">
          Realer tracker you
        </p>
      </div>

      {/* รูปภาพสำหรับหน้าแรก */}
      <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-2xl">
        <Image
          src={foodtracker}
          alt="รูปภาพเกี่ยวกับ Food Tracker"
          className="object-cover w-full h-full"

        />
      </div>

      {/* กลุ่มปุ่ม Register และ Login */}
      <div className="flex mt-8 space-x-4">
        <a href="/register" className="px-8 py-3 font-semibold transition-all duration-300 transform bg-teal-500 rounded-full shadow-lg hover:bg-teal-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300">
            Register
        </a>
        <a href="/login" className="px-8 py-3 font-semibold transition-all duration-300 transform bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300">
            Login
        </a>
      </div>
    </div>
  );
};

export default HomePage;
