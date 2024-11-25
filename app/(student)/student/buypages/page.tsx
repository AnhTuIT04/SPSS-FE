'use client'
import React from 'react'
import styles from '@/app/(student)/student.module.css';
import { InputNumber } from 'antd'
import type { InputNumberProps } from 'antd'
import { useState } from 'react';

const Page = () => {
    const [outputValue, setOutputValue] = useState(0);

    const handleInputChange = (value: number | null) => {
        if (value !== null) {
            setOutputValue(value * 1000); // Example: square the input
        } else {
            setOutputValue(0); // Reset output when input is cleared
        }
    };
    // Input
    // const handleInputChange: InputNumberProps['onChange'] = (value) => {
    //     console.log('changed', value);
    // };
    const formatNumber = (value: number | null): string => {
        if (value === null) return '0';
        return new Intl.NumberFormat('vi-VN').format(value); // Định dạng cho locale Việt Nam
    };

    return (
        <div>
            <div className='relative flex items-center text-center max-w-[1130px] h-[200px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
                <div className='absolute left-[32px] top-[30px]'>
                    <span className='font-bold text-[64px]'>132</span>
                    <span className='text-[24px] leading-[30px] flex'>pages remaining</span>
                </div>
                <div>

                </div>
            </div>
            <div className="mt-[80px] justify-center max-w-[1130px] mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <span className='text-2xl font-bold mb-4'>
                        Buy Pages
                    </span>
                    <div className='ml-[24px]'>
                        <div className='my-[8px]'>Default Page Size: A4</div>
                        <div className='flex items-center'>
                            <InputNumber
                                className='block'
                                style={{ width: '200px' }}
                                placeholder='Enter number of page(s)'
                                onChange={handleInputChange}
                                changeOnWheel
                            />
                            <span className='ml-2 text-[16px] font-bold'>1.000VNĐ</span>
                            /page
                        </div>
                    </div>
                </div>
                <div className='relative flex mt-[50px]'>
                    <div>
                        <span className='text-2xl font-bold mr-[12px]'>
                            Total
                        </span>
                        <span className='text-[36px] font-bold mb-4'>
                            {formatNumber(outputValue)}VNĐ
                        </span>
                    </div>
                    <div className='absolute right-0 bottom-0'>
                        <button className={styles.buttonNext}>Pay with BKPay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page