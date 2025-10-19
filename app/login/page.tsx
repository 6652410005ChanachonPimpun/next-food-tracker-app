"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import React from 'react';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        // error อีเมลหรือรหัสผ่านไม่ถูกต้อง
        throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      }
      // สำเร็จ พาไปยังหน้า dashboard
      router.push('/dashboard');

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert(error.message);
      } else {
        console.error(error);
        alert("เกิดข้อผิดพลาดบางอย่าง");
      }
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">เข้าสู่ระบบ</h1>
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email Input */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">อีเมล</label>
            <input
              type="email"
              placeholder="กรุณากรอกอีเมล"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold mb-2">รหัสผ่าน</label>
            <input
              type="password"
              placeholder="กรุณากรอกรหัสผ่าน"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            เข้าสู่ระบบ
          </button>

          {/* Register Page */}
          <p className="text-sm text-gray-600 pt-4 text-center">
            ยังไม่มีบัญชีใช่ไหม?{" "}
            <a href="/register" className="text-blue-500 hover:underline font-semibold">
              ลงทะเบียนเลย!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;