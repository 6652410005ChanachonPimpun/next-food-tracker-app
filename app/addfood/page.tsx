'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const AddFoodPage = () => {
  const router = useRouter();

  const [foodName, setFoodName] = useState<string>('');
  const [mealType, setMealType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("คุณต้องเข้าสู่ระบบก่อนทำการบันทึกข้อมูล");
      }

      let foodImageUrl = '';

      if (imageFile) {
        const fileName = `${user.id}/${Date.now()}_${imageFile.name}`;

        const { error: uploadError } = await supabase.storage
          .from('food_bk')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from('food_bk')
          .getPublicUrl(fileName);

        foodImageUrl = publicUrlData.publicUrl;
      }

      const foodData = {
        foodname: foodName,
        meal: mealType,
        fooddate_at: selectedDate,
        food_image_url: foodImageUrl,
        user_id: user.id,
      };

      const { error: dbError } = await supabase.from('food_tb').insert([foodData]);

      if (dbError) {
        throw dbError;
      }

      alert('บันทึกข้อมูลอาหารสำเร็จ!');
      router.push('/dashboard');

    } catch (error) {
      let message = 'เกิดข้อผิดพลาดที่ไม่รู้จัก';
      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message);
      }
      console.error('Detailed Error:', error); 
      setErrorMessage(`เกิดข้อผิดพลาด: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-gradient-to-r from-emerald-200 to-lime-300 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          เพิ่มอาหาร
        </h1>

        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name */}
          <div>
            <label htmlFor="foodName" className="block text-gray-700 text-sm font-semibold mb-2">ชื่ออาหาร</label>
            <input
              type="text"
              id="foodName"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="ป้อนชื่ออาหาร"
              required
            />
          </div>

          {/* Meal Select */}
          <div>
            <label htmlFor="mealType" className="block text-gray-700 text-sm font-semibold mb-2">มื้ออาหาร</label>
            <select
              id="mealType"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="" disabled>เลือกมื้ออาหาร</option>
              <option value="มื้อเช้า">มื้อเช้า</option>
              <option value="มื้อกลางวัน">มื้อกลางวัน</option>
              <option value="มื้อเย็น">มื้อเย็น</option>
              <option value="ของว่าง">ของว่าง</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">วันที่</label>
            <input
              type="date"
              id="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          {/* Image Upload and Preview */}
          <div className="flex flex-col items-center">
            <label className="block text-gray-700 text-sm font-semibold mb-2">รูปภาพอาหาร</label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              เลือกรูปภาพ
            </button>
            {imagePreview && (
              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm mb-2">แสดงตัวอย่างรูปภาพ</p>
                <img
                  src={imagePreview}
                  alt="รูปภาพอาหาร"
                  className="max-h-64 rounded-xl shadow-md mx-auto"
                />
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        </form>

        {/* Dashboard Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleGoBack}
            className="text-gray-500 hover:text-gray-700 text-sm font-semibold transition duration-300"
          >
            กลับไปที่แดชบอร์ด
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFoodPage;

