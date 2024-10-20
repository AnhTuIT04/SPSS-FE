'use client';

import { PaymentLog, columns } from './columns';
import { DataTable } from './data-table';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePickerWithRange } from '../PrintTable/DateRangePicker';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

async function getData(): Promise<PaymentLog[]> {
  const response = await fetch('https://67143dff690bf212c76102cb.mockapi.io/api/v1/paymentData');

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const printingLogs: PaymentLog[] = await response.json();

  return printingLogs;
}

export default function DemoPage() {
  const [paymentData, setPaymentData] = useState<PaymentLog[]>([]);

  const [data, setData] = useState(paymentData);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  // Fetching payment data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setPaymentData(fetchedData); // No need to spread, just set fetched data
    };
    fetchData();
  }, []);

  // Filtering data based on selected date range whenever `paymentData` or `date` changes
  useEffect(() => {
    const filteredData = paymentData.filter((log) => {
      const logDate = new Date(log.date);
      return (
        logDate >= (date?.from || subDays(new Date(), 6)) && logDate <= (date?.to || new Date())
      );
    });

    setData(filteredData); // Update data with filtered results
  }, [paymentData, date]); // Re-run filter logic when `paymentData` or `date` changes

  return (
    <ScrollArea className="max-lg:hidden whitespace-nowrap rounded-md border">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-bold">Payment Info</CardTitle>
          <div>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
