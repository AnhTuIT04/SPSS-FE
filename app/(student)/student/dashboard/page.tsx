'use client';

import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Spin, message } from 'antd';
import dayjs from 'dayjs';
import { Input } from '@/components/ui/input';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

// import { dashboardCards } from "@/constants/student"
import Image from 'next/image';
import pageBalance from '@/public/assets/pagebalance.svg';
import pagePrinted from '@/public/assets/pageprinted.svg';
import trendUp from '@/public/assets/trend_up.svg';
import trendDown from '@/public/assets/trend_down.svg';

export default function Home() {
    const { RangePicker } = DatePicker;

    const [activeTab, setActiveTab] = useState<'printLog' | 'paymentLog'>('printLog');

    const [dataPrint, setDataPrint] = useState([]);
    const [filteredDataPrint, setFilteredDataPrint] = useState([]);
    const [loadingPrint, setLoadingPrint] = useState(false);

    const [dataPayment, setDataPayment] = useState([]);
    const [filteredDataPayment, setFilteredDataPayment] = useState([]);
    const [loadingPayment, setLoadingPayment] = useState(false);

    // Fetch data from API
    const fetchDataPrint = async () => {
        setLoadingPrint(true);
        try {
            const response = await fetch('https://673760e4aafa2ef222339c88.mockapi.io/student'); // Replace with your API URL

            console.log(response);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            setDataPrint(result);
            setFilteredDataPrint(result); // Initialize filtered data
        } catch (error) {
            message.error('Failed to load data. Please try again.');
            console.error(error);
        } finally {
            setLoadingPrint(false);
        }
    };

    useEffect(() => {
        fetchDataPrint();
    }, []);

    // Fetch data from API
    const fetchDataPayment = async () => {
        setLoadingPayment(true);
        try {
            const response = await fetch('https://67143dff690bf212c76102cb.mockapi.io/api/v1/paymentData'); // Replace with your API URL
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            setDataPayment(result);
            setFilteredDataPayment(result); // Initialize filtered data
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

    // Handle date range filtering
    const handleDateChangePrint = (dates) => {
        if (!dates || dates.length === 0) {
            setFilteredDataPrint(dataPrint); // Reset to original data if no date selected
            return;
        }

        const [start, end] = dates;
        const filtered = dataPrint.filter((item) => {
            const itemDate = dayjs(item.date);
            return itemDate.isBetween(start, end, null, '[]'); // Include start and end dates
        });

        setFilteredDataPrint(filtered);
    };

    const handleSearchChangePrint = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filtered = dataPrint.filter((item) =>
            Object.values(item).some((field) =>
                // Convert field to string and check if it includes the search value
                String(field).toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilteredDataPrint(filtered);
    };

    // Handle date range filtering
    const handleDateChangePayment = (dates) => {
        if (!dates || dates.length === 0) {
            setFilteredDataPayment(dataPayment); // Reset to original data if no date selected
            return;
        }

        const [start, end] = dates;
        const filtered = dataPayment.filter((item) => {
            const itemDate = dayjs(item.date);
            return itemDate.isBetween(start, end, null, '[]'); // Include start and end dates
        });

        setFilteredDataPayment(filtered);
    };

    const handleSearchChangePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filtered = dataPayment.filter((item) =>
            Object.values(item).some(
                (field) =>
                    typeof field === 'string' &&
                    field.toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilteredDataPayment(filtered);
    }

    // Table columns definition
    const columnsPrint = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'File Name', dataIndex: 'filename', key: 'filename' },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Printer', dataIndex: 'printer', key: 'printer' },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span
                    style={{
                        color: status === 'Completed' ? 'green' : status === 'Rejected' ? 'red' : 'inherit',
                    }}
                >
                    {status}
                </span>
            )
        },
    ];

    const columnsPayment = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Number of Pages', dataIndex: 'numberOfPages', key: 'numberOfPages' },
        // { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Amount', dataIndex: 'amount', key: 'amount',
            render: (amount) => (
                <span>
                    {amount}VNĐ
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span
                    style={{
                        color: status === 'Completed' ? 'green' : status === 'Rejected' ? 'red' : 'inherit',
                    }}
                >
                    {status}
                </span>
            )
        },
    ];


    return (
        <div>
            <div className="flex flex-col gap-2 mb-[32px]">
                <div>
                    <p className="text-2xl font-bold">Dashboard</p>
                </div>
                {/* <div className="flex flex-wrap justify-evenly gap-4 p-4">
                {dashboardCards.map((card) => (
                    <DashboardCard key={card.label} {...card} trend={card.trend as "up" | "down"} />
                ))}
            </div> */}
                <div className='flex my-[16px]'>
                    <div className='relative p-[16px] mr-[32px] bg-white w-[250px] h-[140px] [box-shadow:6px_6px_54px_rgba(0,_0,_0,_0.05)] rounded-[14px]'>
                        <div className='flex'>
                            <div>
                                <h2 className='text-[16px] text-[#636466]'>Page Balance</h2>
                                <h3 className='text-[28px] font-semibold'>365</h3>
                            </div>
                            <Image className='absolute right-[16px]'
                                src={pageBalance} alt='pageBalance' width={50}></Image>
                        </div>
                        <div className='flex absolute bottom-[16px]'>
                            <Image className='mr-[4px]' src={trendUp} alt='trendUp'></Image>
                            <span className='text-[14px] text-[#636466]'>
                                <span className='text-[#00B69B]'>+15 </span>
                                pages from SPSO</span>
                        </div>
                    </div>
                    <div className='relative p-[16px] mr-[32px] bg-white w-[250px] h-[140px] [box-shadow:6px_6px_54px_rgba(0,_0,_0,_0.05)] rounded-[14px]'>
                        <div className='flex'>
                            <div>
                                <h2 className='text-[16px] text-[#636466]'>Total Pages Printed</h2>
                                <h3 className='text-[28px] font-semibold'>293</h3>
                            </div>
                            <Image className='absolute right-[16px]'
                                src={pagePrinted} alt='pageBalance' width={50}></Image>
                        </div>
                        <div className='flex absolute bottom-[16px]'>
                            <Image className='mr-[4px]' src={trendDown} alt='trendDown'></Image>
                            <span className='text-[14px] text-[#636466]'>
                                <span className='text-[#F93C65]'>4,3% </span>
                                down from yesterday</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Nút chuyển đổi */}
            <p className="text-2xl font-bold mb-[12px]">Log</p>
            <div className="mb-4 flex space-x-4">
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'printLog' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('printLog')}
                >
                    Printing
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'paymentLog' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('paymentLog')}
                >
                    Payment
                </button>
            </div>

            {activeTab === 'printLog' &&
                (
                    <div className='flex flex-col w-full gap-4'>
                        <div className='flex w-full justify-between items-center'>
                            {/* Search Bar */}
                            <div className='w-full max-w-xl'>
                                {/* <Label htmlFor="studentSearchBar" className="text-right">
                                    Search Bar
                                </Label> */}
                                <Input id="studentSearchBar" placeholder="Search by keywords..." className="col-span-3 w-[400px]" onChange={handleSearchChangePrint} />
                            </div>
                            {/* Date Range Picker */}
                            <div className=''>
                                <span className='text-l mr-2'>Filter by Date</span>
                                <RangePicker onChange={handleDateChangePrint} />
                            </div>
                        </div>
                        {/* Table */}
                        {loadingPrint ? (
                            <Spin tip="Loading..." />
                        ) : (
                            <div>
                                <Table columns={columnsPrint} dataSource={filteredDataPrint} rowKey="id" />
                            </div>
                        )}
                    </div>
                )}

            {activeTab === 'paymentLog' && (
                <div className='flex flex-col w-full gap-4'>
                    <div className='flex w-full justify-between items-center'>
                        {/* Search Bar */}
                        <div className='w-full max-w-xl'>
                            {/* <Label htmlFor="studentSearchBar" className="text-right">
                                Search Bar
                            </Label> */}
                            <Input id="studentSearchBar" placeholder="Search by keywords..." className="col-span-3 w-[400px]" onChange={handleSearchChangePayment} />
                        </div>
                        {/* Date Range Picker */}
                        <div className=''>
                            <span className='text-l mr-2'>Filter by Date</span>
                            <RangePicker onChange={handleDateChangePayment} />
                        </div>
                    </div>
                    {/* Table */}
                    {loadingPayment ? (
                        <Spin tip="Loading..." />
                    ) : (
                        <div>
                            <Table columns={columnsPayment} dataSource={filteredDataPayment} rowKey="id" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
