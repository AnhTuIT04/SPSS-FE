'use client'
import React from 'react'
import styles from '@/app/(student)/student.module.css';
import { InputNumber } from 'antd'
import { Spin, Table, message } from 'antd'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

const BuyPage = ({ user }: { user: any }) => {
    const [outputValue, setOutputValue] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [dataPayment, setDataPayment] = useState([]);
    const [filteredDataPayment, setFilteredDataPayment] = useState([]);
    const [loadingPayment, setLoadingPayment] = useState(false);

    // Fetch data from API
    const fetchDataPayment = async () => {
        setLoadingPayment(true);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/student/${user.id}/paymentLog`); // Replace with your API URL

            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            result.returnData = result.returnData.map((item: any) => ({
                ...item,
                date: formatDate(item.date),
            }));

            setCurrentPage(result.studentInfo.pages);
            setDataPayment(result.returnData);
            setFilteredDataPayment(result.returnData); // Initialize filtered data
        } catch (error) {
            message.error('Failed to load data. Please try again.');
            console.error(error);
        } finally {
            setLoadingPayment(false);
        }
    };

    useEffect(() => {
        fetchDataPayment();
    }, []);

    const handleInputChange = (value: number | null) => {
        if (value !== null) {
            setOutputValue(value * 1000); // Example: square the input
        } else {
            setOutputValue(0); // Reset output when input is cleared
        }
    };

    const handleBuyPage = async () => {
        alert(`Bạn đã đặt mua ${Math.floor(outputValue / 1000)} trang. Vui lòng thanh toán ${outputValue}VNĐ để hoàn tất giao dịch.`);

        await fetch(`http://localhost:3000/api/v1/student/buyPage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user.id,
                numberOfPage: Math.floor(outputValue / 1000),
                amount: outputValue,
            }),
        });

        fetchDataPayment();
    }

    const formatNumber = (value: number | null): string => {
        if (value === null) return '0';
        return new Intl.NumberFormat('vi-VN').format(value); // Định dạng cho locale Việt Nam
    };

    const columnsPayment = [
        {
            title: 'Number of Pages', dataIndex: 'numberOfPage', key: 'numberOfPage',
            render: (text: any, record: any) => (
                <span style={{
                    borderRight: '2px solid #000',
                    paddingRight: 32,
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}>
                    +{text} A4 pages
                </span>
            ),
        },
        {
            title: 'Date', dataIndex: 'date', key: 'date',
            render: (text: any, record: any) => (
                <span style={{
                    borderRight: '2px solid #000',
                    paddingRight: 32,
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Amount', dataIndex: 'amount', key: 'amount',
            render: (text: any, record: any) => (
                <span style={{
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}>
                    Paid {text}VNĐ
                </span>
            ),
        },
    ];

    return (
        <div>
            <div className='relative flex items-center text-center max-w-[1130px] h-[200px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
                <div className='absolute left-[32px] top-[30px]'>
                    <span className='font-bold text-[64px]'>{currentPage}</span>
                    <span className='text-[24px] leading-[30px] flex'>pages remaining</span>
                </div>
                <div className='absolute right-5'>
                    {/* Table */}
                    {loadingPayment ? (
                        <Spin tip="Loading..." />
                    ) : (
                        <div>
                            <Table
                                rowClassName={() => 'gray-background'}
                                showHeader={false}
                                pagination={false}
                                columns={columnsPayment}
                                dataSource={filteredDataPayment.slice(0, 3)}
                                rowKey="id" />
                        </div>
                    )}
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
                    <div className='absolute right-0 bottom-0'
                        onClick={handleBuyPage}
                    >
                        <button className={styles.buttonNext}>Pay with BKPay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyPage