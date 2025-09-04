"use client";

import React, { useState, ChangeEvent } from 'react';
 
// Define the shape of a food entry using a TypeScript interface.
interface FoodEntry {
    id: number;
    date: string;
    imageUrl: string;
    foodName: string;
    mealType: string;
}
 
// Mock data to simulate 10 food entries.
const MOCK_DATA: FoodEntry[] = [
    { id: 1, date: '2023-10-26', imageUrl: 'https://placehold.co/50x50/FCA5A5/ffffff?text=F1', foodName: 'ข้าวผัด', mealType: 'อาหารกลางวัน' },
    { id: 2, date: '2023-10-25', imageUrl: 'https://placehold.co/50x50/FDBA74/ffffff?text=F2', foodName: 'สเต็กไก่', mealType: 'อาหารเย็น' },
    { id: 3, date: '2023-10-25', imageUrl: 'https://placehold.co/50x50/B8B8B8/ffffff?text=F3', foodName: 'สลัดผัก', mealType: 'อาหารกลางวัน' },
    { id: 4, date: '2023-10-24', imageUrl: 'https://placehold.co/50x50/FCA5A5/ffffff?text=F4', foodName: 'แกงเขียวหวาน', mealType: 'อาหารเย็น' },
    { id: 5, date: '2023-10-24', imageUrl: 'https://placehold.co/50x50/FDBA74/ffffff?text=F5', foodName: 'ก๋วยเตี๋ยว', mealType: 'อาหารกลางวัน' },
    { id: 6, date: '2023-10-23', imageUrl: 'https://placehold.co/50x50/B8B8B8/ffffff?text=F6', foodName: 'ต้มยำกุ้ง', mealType: 'อาหารเย็น' },
    { id: 7, date: '2023-10-23', imageUrl: 'https://placehold.co/50x50/FCA5A5/ffffff?text=F7', foodName: 'ซุปมิโซะ', mealType: 'อาหารเช้า' },
    { id: 8, date: '2023-10-22', imageUrl: 'https://placehold.co/50x50/FDBA74/ffffff?text=F8', foodName: 'ไข่เจียว', mealType: 'อาหารเช้า' },
    { id: 9, date: '2023-10-22', imageUrl: 'https://placehold.co/50x50/B8B8B8/ffffff?text=F9', foodName: 'ข้าวเหนียวมะม่วง', mealType: 'ของหวาน' },
    { id: 10, date: '2023-10-21', imageUrl: 'https://placehold.co/50x50/FCA5A5/ffffff?text=F10', foodName: 'พิซซ่า', mealType: 'อาหารเย็น' },
];
 
// Dashboard component displays a table of food entries with search, edit, and delete functionality.
export default function DashboardPage() {
    const [data, setData] = useState<FoodEntry[]>(MOCK_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
 
    // Handles changes to the search input.
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };
 
    // Filters data based on the search query.
    const filteredData = data.filter(item =>
        item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
 
    // Pagination logic.
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
 
    // Changes the current page.
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
 
    // Placeholder function for edit action.
    const handleEdit = (id: number) => {
        console.log(`Edit item with ID: ${id}`);
        // In a real app, this would navigate to an edit page or open a modal.
    };
 
    // Placeholder function for delete action.
    const handleDelete = (id: number) => {
        console.log(`Delete item with ID: ${id}`);
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    };
 
    return (
        <div className="min-h-screen p-8 bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-600">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto transform transition-all duration-300 ease-in-out">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-6">
                    DashBoard
                </h1>
 
                {/* Top bar with Search and Add Food button */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2 relative">
                        <input
                            type="text"
                            placeholder="ค้นหาชื่ออาหาร..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        />
                        <svg
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                            />
                        </svg>
                    </div>
                    <a
                        href="/addfood"
                        className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full text-center shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                    >
                        + Add Food
                    </a>
                </div>
 
                {/* Food entries table */}
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
                            {currentItems.map((item) => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.date}</td>
                                    <td className="py-3 px-6 text-left">
                                        <img src={item.imageUrl} alt={item.foodName} className="w-12 h-12 rounded-full object-cover" />
                                    </td>
                                    <td className="py-3 px-6 text-left">{item.foodName}</td>
                                    <td className="py-3 px-6 text-left">{item.mealType}</td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center space-x-2">
                                            <button
                                                onClick={() => handleEdit(item.id)}
                                                className="p-2 bg-yellow-400 text-white rounded-full shadow-md hover:bg-yellow-500 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM13.828 4l-6.812 6.812L5.828 12H4.172l1.378-1.378 6.812-6.812 1.656 1.656zM15 11h-2v2h-2v-2h-2v2H7v-2H5v-2h10v2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-red-400 text-white rounded-full shadow-md hover:bg-red-500 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
 
                {/* Pagination controls */}
                {filteredData.length > itemsPerPage && (
                    <div className="flex justify-center items-center mt-6 space-x-2">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-full font-semibold transition-colors ${currentPage === index + 1
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
 
 