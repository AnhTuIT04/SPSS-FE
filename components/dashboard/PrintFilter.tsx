'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { paymentData } from '@/constants/spso';
import AreaChartComponent from './AreaChartComponent';
import { DatePickerWithRange } from '../PrintTable/DateRangePicker';

const AreaChartAndFilter = () => {
  const [chartData, setChartData] = useState(paymentData);

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  useEffect(() => {
    const filteredData = paymentData.filter((log) => {
      const logDate = new Date(log.date);
      const isDateMatch = logDate >= date?.from && logDate <= date?.to;
      return isDateMatch;
    });

    setChartData(filteredData);
  }, [date]);

  const resetFilter = () => {
    setDate({
      from: subDays(new Date(), 6),
      to: new Date(),
    });
  };

  return (
    <Card className='w-full'>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold">Payment Log</CardTitle>
        <CardDescription className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtered By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <DatePickerWithRange date={date} setDate={setDate} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset Filter */}
          <Button variant="outline" onClick={resetFilter}>
            Reset Filter
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChartComponent data={chartData} />
      </CardContent>
    </Card>
  );
};

export default AreaChartAndFilter;
