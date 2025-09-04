"use client";

import { useState, useEffect } from 'react';
import { useRouter} from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  useEffect(() => {
    // Your login logic here
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">เข้าสู่ระบบ</h1>
        
        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Login Button */}
          <button
          onClick={handleLogin }
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            เข้าสู่ระบบ
          </button>
          {/* don't have an account */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Dont have an account? {" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;