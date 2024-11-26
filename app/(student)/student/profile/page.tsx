'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import studentAvatar from '@/public/assets/student.svg';
import Image from 'next/image';

const Page = () => {
    // const [student, setStudent] = useState({
    //     name: 'Nguyen Van A',
    //     email: 'nguyenvana@example.com',
    //     ID: '2210001',
    //     gender: 'Female',
    //     class: 'MT22KH08',
    //     faculty: 'Computer Science & Engineering',
    //     address: '123 Street, Ho Chi Minh City',
    // });

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gửi request đến API
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch('https://673760e4aafa2ef222339c88.mockapi.io/student/2'); // Thay bằng URL của API
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                const data = await response.json();
                setStudent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, []);

    // Hiển thị loading hoặc lỗi
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='h-[540px] w-[1100px] bg-[#ffffff] rounded-[9.36111px] p-8'>
            <div className="flex flex-row">
                <Image
                    src={studentAvatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mr-4"
                ></Image>
                <div className='flex flex-col justify-center'>
                    <span className='font-medium text-[20px]'>{student.name}</span>
                    <span className='font-medium text-[15px] text-[#000000] opacity-50'>{student.email}</span>
                </div>
            </div>
            <div className='flex gap-24'>
                <div>
                    {/* Full Name */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Full Name</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[450px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {student.name}
                        </div>
                    </div>
                    {/* Gender */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Gender</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[450px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {student.gender}
                        </div>
                    </div>
                    {/* Faculty */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Faculty</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[450px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {student.faculty}
                        </div>
                    </div>
                </div>
                <div>
                    {/* ID */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Student ID</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[450px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {student.ID}
                        </div>
                    </div>
                    {/* Address */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Address</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[450px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {student.address}
                        </div>
                    </div>
                    {/* Class */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Class</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[450px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {student.class}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page