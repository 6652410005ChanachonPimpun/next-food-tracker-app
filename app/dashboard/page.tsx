'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
//เพิ่มเพราะใช้ any ไม่ได้
interface FoodEntry {
    id: number;
    fooddate_at: string;
    food_image_url: string | null;
    foodname: string;
    meal: string;
}

interface UserProfile {
    fullname: string;
    user_image_url: string | null;
}

export default function DashboardPage() {
    const [foodData, setFoodData] = useState<FoodEntry[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDataAndFood = async () => {
            try {
                const { data: { user: currentUser } } = await supabase.auth.getUser();

                if (!currentUser) {
                    setIsLoading(false);
                    return;
                }

                // ดึงข้อมูลโปรไฟล์ (user_tb) ของผู้ใช้คนนี้
                const { data: profileData, error: profileError } = await supabase
                    .from('user_tb')
                    .select('fullname, user_image_url')
                    .eq('id', currentUser.id)
                    .single();

                if (profileError) {
                    console.error("Could not fetch user profile:", profileError.message);
                } else {
                    setUserProfile(profileData);
                }

                // ดึงข้อมูลอาหาร (food_tb) ของผู้ใช้คนนี้
                const { data, error } = await supabase
                    .from('food_tb')
                    .select('*')
                    .eq('user_id', currentUser.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }

                setFoodData(data);

            } catch (err) {
                let message = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
                if (err instanceof Error) {
                    message = err.message;
                }
                console.error("Fetch Data Error:", message);
                setErrorMessage(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDataAndFood();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? (การกระทำนี้จะลบรูปภาพอย่างถาวร)')) {
            try {
                const itemToDelete = foodData.find(item => item.id === id);

                if (!itemToDelete) throw new Error("ไม่พบรายการที่ต้องการลบ");

                if (itemToDelete.food_image_url) {
                    const bucketName = 'food_bk';
                    const filePath = itemToDelete.food_image_url.substring(
                        itemToDelete.food_image_url.indexOf(bucketName) + bucketName.length + 1
                    );

                    const { error: storageError } = await supabase.storage
                        .from(bucketName)
                        .remove([filePath]);

                    if (storageError) {
                        throw new Error(`ไม่สามารถลบไฟล์รูปภาพได้: ${storageError.message}`);
                    }
                }

                const { error: dbError } = await supabase
                    .from('food_tb')
                    .delete()
                    .match({ id: id });

                if (dbError) throw dbError;

                setFoodData(foodData.filter(item => item.id !== id));
                alert('ลบข้อมูลสำเร็จ!');

            } catch (err) {
                let message = 'เกิดข้อผิดพลาดในการลบ';
                if (err instanceof Error) {
                    message = err.message;
                }
                console.error("Delete Error:", err);
                alert(message);
            }
        }
    };

    const renderTableContent = () => {
        if (isLoading) {
            return (
                <tr>
                    <td colSpan={5} className="text-center p-4 py-6 text-gray-500">
                        กำลังโหลดข้อมูล...
                    </td>
                </tr>
            );
        }
        if (errorMessage) {
            return (
                <tr>
                    <td colSpan={5} className="text-center p-4 py-6 text-red-500">
                        เกิดข้อผิดพลาด: {errorMessage}
                    </td>
                </tr>
            );
        }
        if (foodData.length === 0) {
            return (
                <tr>
                    <td colSpan={5} className="text-center p-4 py-6 text-gray-500">
                        ไม่พบข้อมูลอาหาร... ลองเพิ่มรายการอาหารใหม่ดูสิ!
                    </td>
                </tr>
            );
        }
        return foodData.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-6 text-left whitespace-nowrap">{item.fooddate_at}</td>
                <td className="py-3 px-6 text-left">
                    <img
                        src={item.food_image_url || 'https://placehold.co/50x50/B8B8B8/ffffff?text=?'}
                        alt={item.foodname}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                </td>
                <td className="py-3 px-6 text-left">{item.foodname}</td>
                <td className="py-3 px-6 text-left">{item.meal}</td>
                <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-400 text-white rounded-full shadow-md hover:bg-red-500 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </td>
            </tr>
        ));
    };

    return (
        <div className="min-h-screen p-8 bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-600">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                        DashBoard
                    </h1>

                    {userProfile ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 font-semibold hidden sm:block">
                                {userProfile.fullname || 'ผู้ใช้งาน'}
                            </span>
                            <img
                                src={userProfile.user_image_url || `https://placehold.co/48x48/E2E8F0/4A5568?text=${userProfile.fullname?.charAt(0) || 'U'}`}
                                alt="Profile"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md border-2 border-indigo-200"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded-md w-24 hidden sm:block"></div>
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2 relative">
                        <input
                            type="text"
                            placeholder="ค้นหาชื่ออาหาร..."
                            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                    </div>
                    <a href="/addfood" className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full text-center shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">
                        + Add Food
                    </a>
                </div>

                <div className="overflow-x-auto rounded-xl shadow-lg">
                    <table className="min-w-full bg-white rounded-xl">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">วันที่</th>
                                <th className="py-3 px-6 text-left">รูปภาพ</th>
                                <th className="py-3 px-6 text-left">ชื่ออาหาร</th>
                                <th className="py-3 px-6 text-left">มื้ออาหาร</th>
                                <th className="py-3 px-6 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {renderTableContent()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

