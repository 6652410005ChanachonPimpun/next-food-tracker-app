
"use client";
import React, { useState } from 'react';
import Script from 'next/script';

// Main App component
const App = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Function to handle image selection and create a preview URL
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    } else {
      setImagePreviewUrl(null);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('ข้อมูลที่ส่ง:', { fullName, email, password, gender, image: imagePreviewUrl });
    setFormSubmitted(true);
  };

  return (
    // Tailwind CSS CDN and font
    <>
      <Script src="https://cdn.tailwindcss.com"></Script>
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }
        .vibrant-bg {
          background: linear-gradient(to right, #6EE7B7, #3B82F6, #9333EA);
        }
        .form-container {
          max-width: 480px;
          margin: 2rem auto;
          padding: 2rem;
        }
        .image-upload-label {
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }
        .image-upload-label:hover {
          background-color: #E5E7EB;
        }
        `}
      </style>

      {/* Main container with bright background */}
      <div className="vibrant-bg min-h-screen flex items-center justify-center p-4">
        <div className="form-container bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">ลงทะเบียน</h1>
          
          {/* Success message after submission */}
          {formSubmitted ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg" role="alert">
              <p className="font-bold">ลงทะเบียนสำเร็จ!</p>
              <p>ยินดีต้อนรับสู่ครอบครัวของเรา</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">ชื่อ-สกุล</label>
                <input
                  type="text"
                  placeholder="กรุณากรอกชื่อ-สกุล"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">อีเมล</label>
                <input
                  type="email"
                  placeholder="กรุณากรอกอีเมล"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">รหัสผ่าน</label>
                <input
                  type="password"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Gender Selection */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">เพศ</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>กรุณาเลือกเพศ</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>

              {/* Image Upload with Preview */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">รูปภาพ</label>
                <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center border border-dashed border-gray-400 p-4 relative">
                  {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Image Preview" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <span className="text-gray-500 text-center">กรุณาเลือกรูปภาพ</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
              >
                ลงทะเบียน
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              มีบัญชีอยู่แล้วใช่ไหม?{' '}
              <a href="/login" className="text-blue-600 font-bold hover:underline">
                เข้าสู่ระบบที่นี่
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
