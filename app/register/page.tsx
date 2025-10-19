'use client'

import React, { useState } from "react";
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [fullname, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [user_image_url, setUserImageUrl] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // State สำหรับจัดการ Loading และ Error
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserImageUrl(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // สมัครสมาชิก
      const { data: authResponse, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        throw signUpError;
      }

      // ตรวจสอบว่าได้ user object กลับมาหรือไม่
      if (authResponse.user) {
        let image_URL = '';

        // อัปโหลดรูปภาพ
        if (user_image_url) {
          const new_file_name = `${authResponse.user.id}/${Date.now()}_${user_image_url.name}`;
          const { error: uploadError } = await supabase.storage
            .from('user_bk')
            .upload(new_file_name, user_image_url);

          if (uploadError) {
            throw uploadError;
          }

          const { data: publicData } = supabase.storage
            .from('user_bk')
            .getPublicUrl(new_file_name);
          image_URL = publicData.publicUrl;
        }

        // อัปเดตข้อมูลเพิ่มเติมลงในแถวที่ Trigger สร้างไว้
        const { error: updateError } = await supabase
          .from('user_tb')
          .update({
            fullname: fullname,
            password: password,
            gender: gender,
            user_image_url: image_URL,
            // ** ไม่ต้องส่ง email, password ไป **
          })
          // ระบุว่าจะอัปเดตแถวไหน
          .eq('id', authResponse.user.id); 

        if (updateError) {
          throw updateError;
        }
      } else {
        throw new Error("ไม่สามารถสร้างผู้ใช้ได้ กรุณาลองใหม่");
      }

      alert('สมัครสมาชิกสำเร็จ!');
      router.push('/login');

    } catch (err) {
      let message = 'เกิดข้อผิดพลาดที่ไม่รู้จัก';
      if (err instanceof Error) {
        message = err.message;
      }
      console.error('Registration Error:', err);
      setErrorMessage(`เกิดข้อผิดพลาด: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <style>{`
                    .vibrant-bg {
                        background: linear-gradient(to right, #6EE7B7, #3B82F6, #9333EA)
                    }
                `}</style>
        <div className="vibrant-bg min-h-screen flex items-center justify-center p-4">
          <div className="form-container bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">ลงทะเบียน</h1>
            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            )}

            {/* username */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">ชื่อ-สกุล</label>
              <input
                type="text"
                placeholder="กรุณากรอกชื่อ-สกุล"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* email */}
            <div className="mt-4">
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

            {/* Password */}
            <div className="mt-4">
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

            {/* Gender */}
            <div className='mt-4'>
              <label className="block text-gray-700 font-semibold mb-2">เพศ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>

            {/* picture */}
            <div className="flex flex-col items-center mt-5 space-y-4">
              <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200">
                <span>เลือกรูปโปรไฟล์</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
              )}
            </div>

            {/* Register Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
              </button>
            </div>

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
      </form>
    </div>
  )
}
