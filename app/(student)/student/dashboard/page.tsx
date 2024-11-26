'use client';

import React, { useState, useEffect } from 'react';
import { Table, DatePicker, Spin, message } from 'antd'; import dayjs from 'dayjs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

import DashboardCard from '@/components/dashboard/DashboardCard';
// import { dashboardCards } from "@/constants/student"
import Image from 'next/image';
import pageBalance from '@/public/assets/pagebalance.svg';
import pagePrinted from '@/public/assets/pageprinted.svg';
import trendUp from '@/public/assets/trend_up.svg';
import trendDown from '@/public/assets/trend_down.svg';

export default function Home() {
    const { RangePicker } = DatePicker;

    // Mock data
    // const data = [
    //     { id: 1, filename: 'doc1.pdf', size: '2MB', date: '2024-10-01', printer: 'Printer A', status: 'Completed' },
    //     { id: 2, filename: 'doc2.docx', size: '3MB', date: '2024-10-03', printer: 'Printer B', status: 'Pending' },
    //     { id: 3, filename: 'doc3.jpg', size: '1MB', date: '2024-10-05', printer: 'Printer C', status: 'Failed' },
    //     { id: 4, filename: 'doc4.png', size: '500KB', date: '2024-10-07', printer: 'Printer A', status: 'Completed' },
    //     { id: 5, filename: 'doc5.txt', size: '800KB', date: '2024-10-09', printer: 'Printer B', status: 'Pending' },
    // ];

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data from API
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://673760e4aafa2ef222339c88.mockapi.io/log'); // Replace with your API URL
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            setData(result);
            setFilteredData(result); // Initialize filtered data
        } catch (error) {
            message.error('Failed to load data. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle date range filtering
    const handleDateChange = (dates) => {
        if (!dates || dates.length === 0) {
            setFilteredData(data); // Reset to original data if no date selected
            return;
        }

        const [start, end] = dates;
        const filtered = data.filter((item) => {
            const itemDate = dayjs(item.date);
            return itemDate.isBetween(start, end, null, '[]'); // Include start and end dates
        });

        setFilteredData(filtered);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const filtered = data.filter((item) =>
            Object.values(item).some(
                (field) =>
                    typeof field === 'string' &&
                    field.toLowerCase().includes(value.toLowerCase())
            )
        );

        setFilteredData(filtered);
    }

    // Table columns definition
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'File Name', dataIndex: 'filename', key: 'filename' },
        { title: 'Size', dataIndex: 'size', key: 'size' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Printer', dataIndex: 'printer', key: 'printer' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
    ];


    return (
        <div>
            <div className="flex flex-col gap-2">
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


            <div className='flex flex-col w-full gap-4'>
                <div className='flex w-full justify-between items-center'>
                    {/* Search Bar */}
                    <div className='w-full max-w-xl'>
                        <Label htmlFor="studentSearchBar" className="text-right">
                            Search Bar
                        </Label>
                        <Input id="studentSearchBar" placeholder="Enter keywords..." className="col-span-3" onChange={handleSearchChange} />
                    </div>
                    {/* Date Range Picker */}
                    <div className='pt-4'>
                        <RangePicker onChange={handleDateChange} />
                    </div>
                </div>
                {/* Table */}
                {loading ? (
                    <Spin tip="Loading..." />
                ) : (
                    <div>
                        <Table columns={columns} dataSource={filteredData} rowKey="id" />
                    </div>
                )}
            </div>
        </div>
    );
}
