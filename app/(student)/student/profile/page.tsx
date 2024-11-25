'use client'
import React from 'react'
import { useState } from 'react';
import studentAvatar from '@/public/assets/student.svg';
import Image from 'next/image';

const Page = () => {
    const [profile, setProfile] = useState({
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com',
        ID: '2210001',
        gender: 'Female',
        class: 'MT22KH08',
        faculty: 'Computer Science & Engineering',
        address: '123 Street, Ho Chi Minh City',
    });

    return (
        <div className='h-[540px] w-[1200px] bg-[#ffffff] rounded-[9.36111px] p-8'>
            <div className="h-fit flex flex-row">
                <Image
                    src={studentAvatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mr-4"
                ></Image>
                <div className='flex flex-col justify-center'>
                    <span className='font-medium text-[20px]'>{profile.name}</span>
                    <span className='font-medium text-[15px] text-[#000000] opacity-50'>{profile.email}</span>
                </div>
            </div>
            <div className='flex gap-24'>
                <div>
                    {/* Full Name */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Full Name</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[500px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {profile.name}
                        </div>
                    </div>
                    {/* Gender */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Gender</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[500px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {profile.gender}
                        </div>
                    </div>
                    {/* Faculty */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Faculty</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[500px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {profile.faculty}
                        </div>
                    </div>
                </div>
                <div>
                    {/* ID */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Student ID</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[500px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {profile.ID}
                        </div>
                    </div>
                    {/* Address */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Address</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[500px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {profile.address}
                        </div>
                    </div>
                    {/* Class */}
                    <div className='my-[24px]'>
                        <div className='text-[15px] text-[#000000]'>Class</div>
                        <div
                            className='flex items-center my-[8px] px-[24px] w-[500px] h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                            {profile.class}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page