'use client';

import { PaymentLog, columns } from './columns';
import { DataTable } from './data-table';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePickerWithRange } from '../PrintTable/DateRangePicker';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';


async function getData(id: string): Promise<PaymentLog[]> {

  const response = await fetch('http://localhost:3000/api/v1/student/' + id + '/paymentLog');

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  const returnData = res.returnData;
  const studentInfo = res.studentInfo;
  const paymentLogs = returnData.map((log: any) => {
    return {
      id: log.id,
      name: studentInfo.firstName + " " + studentInfo.lastName,
      amount: log.amount,
      date: log.date,
      status: log.status,
      numberOfPage: log.numberOfPage,
    }
  })
  return paymentLogs;
}

export default function DemoPage({ id }: { id: string }) {

  const [tableData, setTableData] = useState<PaymentLog[]>([]);

  const [data, setData] = useState(tableData);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  // Fetching payment data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData(id);
      setTableData(fetchedData); // No need to spread, just set fetched data
    };
    fetchData();
  }, []);

  // Filtering data based on selected date range whenever `paymentData` or `date` changes
  useEffect(() => {
    const filteredData = tableData.filter((log) => {
      const logDate = new Date(log.date);
      return (
        logDate >= (date?.from || subDays(new Date(), 6)) && logDate <= (date?.to || new Date())
      );
    });

    setData(filteredData); // Update data with filtered results
  }, [tableData, date]); // Re-run filter logic when `tableData` or `date` changes

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
