// components/DateRangePicker.tsx
import React, { useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRangePickerProps {
  onApply: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onApply }) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelectionRange(ranges.selection);
  };

  const handleApply = () => {
    onApply(selectionRange.startDate, selectionRange.endDate);
  };

  return (
    <div className='flex flex-col w-fit items-center'>
      <DateRange ranges={[selectionRange]} onChange={handleSelect} moveRangeOnFirstSelection={false} showDateDisplay={true} />
      <div className='bg-white w-full flex justify-center'>
        <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition' onClick={handleApply}>Apply Now</button>
      </div>
    </div>
  );
};

export default DateRangePicker;
