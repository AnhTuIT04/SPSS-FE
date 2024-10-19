'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { DateRange, RangeKeyDict } from 'react-date-range';
import { subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { paymentData } from '@/constants/spso';
import AreaChartComponent from './AreaChartComponent';

const AreaChartAndFilter = () => {
  const [chartData, setChartData] = useState(paymentData);

  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 6),
    endDate: new Date(),
    key: 'selection',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    filterData();
  }, [dateRange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false); // Close  if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, []);

  const handleSelectDateRange = (ranges: RangeKeyDict) => {
    setDateRange(ranges.selection);
  };

  const filterData = () => {
    const newFilteredData = paymentData.filter((job) => {
      const jobDate = new Date(job.date);
      const isInDateRange = jobDate >= dateRange.startDate && jobDate <= dateRange.endDate;

      return isInDateRange;
    });

    setChartData(newFilteredData);
  };

  return (
    <div className="flex flex-col w-full gap-10 pt-6">
      <div className="flex flex-wrap items-center justify-start w-fit h-[70px] rounded-lg bg-white border-b border-gray-200">
        <div className="filter-content px-10">
          <Image src="/assets/filter.svg" width={19.5} height={22.5} alt="Filter" />
        </div>

        <div className="filter-content">Filter By</div>

        {/* Filter by Date */}
        <div ref={datePickerRef} className="filter-content">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex justify-between gap-10"
          >
            <p>Date</p>
            <Image src="/assets/dropdown.svg" alt="Drop down" width={24} height={24} />
          </button>
          {showDatePicker && (
            <div className="absolute z-10 mt-2 p-3 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <DateRange
                ranges={[dateRange]}
                onChange={handleSelectDateRange}
                moveRangeOnFirstSelection={false}
                showDateDisplay={true}
              />
            </div>
          )}
        </div>

        <div className="filter-content">
          <button
            onClick={() => {
              setDateRange({
                startDate: subDays(new Date(), 6),
                endDate: new Date(),
                key: 'selection',
              });
            }}
            className="h-full flex justify-between items-center gap-2"
          >
            <p className="text-[#EA0234]">Reset Filter</p>
            <Image src="/assets/reset.svg" width={18} height={18} alt="Reset" />
          </button>
        </div>
      </div>

      <AreaChartComponent data={chartData} />
    </div>
  );
};

export default AreaChartAndFilter;
