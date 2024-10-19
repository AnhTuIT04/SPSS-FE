'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { DateRange, RangeKeyDict } from 'react-date-range';
import { addDays, subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { printData } from '@/constants/spso';
import LineChart from '../LineChart';

const DashboardFilterAndChart = () => {
  const [chartData, setChartData] = useState(printData);

  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 6),
    endDate: new Date(),
    key: 'selection',
  });

  const [selectedFileType, setSelectedFileType] = useState('All');
  const [selectedPrinter, setSelectedPrinter] = useState('All');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPrinterDropdown, setShowPrinterDropdown] = useState(false);
  const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const printerDropdownRef = useRef<HTMLDivElement>(null);
  const fileTypeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    filterData();
  }, [dateRange, selectedFileType, selectedPrinter]);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        printerDropdownRef.current &&
        !printerDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPrinterDropdown(false); // Close  if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fileTypeDropdownRef.current &&
        !fileTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFileTypeDropdown(false); // Close  if clicked outside
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
    const newFilteredData = printData.filter((job) => {
      const jobDate = new Date(job.date);
      const isInDateRange = jobDate >= dateRange.startDate && jobDate <= dateRange.endDate;

      const isFileTypeMatch = selectedFileType === 'All' || job.fileType === selectedFileType;

      const isPrinterMatch = selectedPrinter === 'All' || job.printer === selectedPrinter;

      return isInDateRange && isFileTypeMatch && isPrinterMatch;
    });

    console.log('Filtered Data:', newFilteredData); // Debugging line
    setChartData(newFilteredData);
  };

  const handleApplyDateRange = () => {
    setShowDatePicker(false);
    filterData();
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
              <div className="bg-white w-full flex justify-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  onClick={handleApplyDateRange}
                >
                  Apply Now
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filter by Printer */}
        <div ref={printerDropdownRef} className="filter-content">
          <button
            onClick={() => setShowPrinterDropdown(!showPrinterDropdown)}
            className="flex justify-between gap-10"
          >
            <p>{selectedPrinter === 'All' ? 'Printer' : selectedPrinter}</p>
            <Image src="/assets/dropdown.svg" alt="Drop down" width={24} height={24} />
          </button>
          {showPrinterDropdown && (
            <div className="flex justify-center absolute z-10 mt-2 p-3 rounded-lg shadow-lg w-[500px] h-fit bg-white ring-1 ring-black ring-opacity-5">
              <div className="w-full flex flex-col p-2 gap-6">
                <h1 className="font-semibold">Select Printer</h1>
                <div className="flex flex-wrap gap-4">
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedPrinter('All')}>
                      All
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedPrinter('Printer A')}>
                      Printer A
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedPrinter('Printer B')}>
                      Printer B
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedPrinter('Printer C')}>
                      Printer C
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter by File Type */}
        <div ref={fileTypeDropdownRef} className="filter-content">
          <button
            onClick={() => setShowFileTypeDropdown(!showFileTypeDropdown)}
            className="flex justify-between gap-10"
          >
            <p>{selectedFileType === 'All' ? 'File Type' : selectedFileType}</p>
            <Image src="/assets/dropdown.svg" alt="Drop down" width={24} height={24} />
          </button>
          {showFileTypeDropdown && (
            <div className="flex justify-center absolute z-10 mt-2 p-3 rounded-lg shadow-lg w-[500px] h-fit bg-white ring-1 ring-black ring-opacity-5">
              <div className="w-full flex flex-col p-2 gap-6">
                <h1 className="font-semibold">Select File Type</h1>
                <div className="flex flex-wrap gap-4">
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedFileType('All')}>
                      All
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedFileType('PDF')}>
                      PDF
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedFileType('DOCX')}>
                      DOCX
                    </button>
                  </div>
                  <div className="dropdown-content">
                    <button className="px-3 py-2" onClick={() => setSelectedFileType('JPEG')}>
                      JPEG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="filter-content">
          <button
            onClick={() => {
              setSelectedFileType('All');
              setSelectedPrinter('All');
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
      <LineChart data={chartData} />
    </div>
  );
};

export default DashboardFilterAndChart;
