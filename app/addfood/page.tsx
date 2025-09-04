'use client';
import React, { useState, useRef } from 'react';

// Single component to handle the entire page
const App = () => {
  const [foodName, setFoodName] = useState<string>('');
  const [mealType, setMealType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle image selection and preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      foodName,
      mealType,
      selectedDate,
      imageFile: imagePreview ? 'Image data exists' : 'No image',
    });
    alert('บันทึกข้อมูลอาหารแล้ว!'); // Use a temporary alert for demonstration
    // In a real app, you would send this data to a backend or database.
  };

  // Function to navigate back to the dashboard
  const handleGoBack = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="bg-gradient-to-r from-emerald-200 to-lime-300 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          เพิ่มอาหาร
        </h1>

        {/* Form to add food details */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name Input */}
          <div>
            <label htmlFor="foodName" className="block text-gray-700 text-sm font-semibold mb-2">
              ชื่ออาหาร
            </label>
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

          {/* Meal Type Select */}
          <div>
            <label htmlFor="mealType" className="block text-gray-700 text-sm font-semibold mb-2">
              มื้ออาหาร
            </label>
            <select
              id="mealType"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="" disabled>เลือกมื้ออาหาร</option>
              <option value="breakfast">มื้อเช้า</option>
              <option value="lunch">มื้อกลางวัน</option>
              <option value="dinner">มื้อเย็น</option>
              <option value="snack">ของว่าง</option>
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">
              วันที่
            </label>
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
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              รูปภาพอาหาร
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {/* Custom button to trigger file input */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
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
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
          >
            บันทึก
          </button>
        </form>

        {/* Back to Dashboard Button */}
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

export default App;
