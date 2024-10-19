// components/DatePickerComponent.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const DatePickerComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date('2024-10-13'));
  const [endDate, setEndDate] = useState<Date | null>(new Date('2024-10-19'));

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-md">
        <div className="flex items-center">
          <DatePicker
            selected={startDate}
            onChange={(dates: [Date, Date] | null) => {
              const [start, end] = dates || [null, null];
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="MMMM d, yyyy"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-center text-gray-600">
          Selected Date Range: {startDate && endDate ? `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}` : 'Select a date range'}
        </p>
      </div>
    </div>
  );
};

export default DatePickerComponent;
