'use client';


import { PrintingLog, columns } from './columns';
import { DataTable } from './data-table';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePickerWithRange } from './DateRangePicker';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

async function getData(): Promise<PrintingLog[]> {
  // Fetch data from your API here.
  const response = await fetch('http://localhost:3000/api/v1/student/printingLog');
  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  const printingLogs = res.map((log: any) => {
    return {
      id: log.printingLogId,
      name: log.firstName + " " + log.lastName,
      date: log.date,
      fileName: log.fileName,
      fileType: log.fileType,
      numberOfPage: log.numberOfPage,
      printer: log.printerName,
      status: log.status,
      user: log.user,
    };
  })

  return printingLogs;
}



export default function DemoPage({ printData }: { printData?: PrintingLog[] }) {
  // const data = await getData();
  const [tableData, setTableData] = useState<PrintingLog[]>([])

  const [data, setData] = useState<PrintingLog[]>(tableData);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setTableData(fetchedData); // No need to spread, just set fetched data
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = tableData.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= date?.from && logDate <= date?.to;
    });

    setData(filteredData);
  }, [tableData, date]);

  return (
    <ScrollArea className="max-lg:hidden whitespace-nowrap rounded-md border">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-bold">Printing Info</CardTitle>
          <div>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </CardHeader>
        <CardContent >
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
