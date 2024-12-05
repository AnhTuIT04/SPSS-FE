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
  const response = await fetch('http://localhost:3000/api/v1/printingLog');
  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const res = await response.json();
  const printingLogs: PrintingLog[] = res.printingLogs;
  const resUser = await fetch('http://localhost:3000/api/v1/user');
  if (!resUser.ok) {
    throw new Error(`Error: ${resUser.status}`);
  }
  const userResponse = await resUser.json();
  const users: { id: string; firstName: string, lastName: string }[] = userResponse;

  const resPrinter = await fetch('http://localhost:3000/api/v1/printer');
  if (!resPrinter.ok) {
    throw new Error(`Error: ${resPrinter.status}`);
  }
  const printerResponse = await resPrinter.json();
  const printers: { id: string; name: string }[] = printerResponse.printers;
  // Create a map of userId to userName
  const userMap = new Map(users.map((user) => [user.id, user.firstName + ' ' + user.lastName]));

  const printerMap = new Map(printers.map((printer) => [printer.id, printer.name]));
  // Add userName to each printing log
  const enrichedLogs = printingLogs.map((log) => ({
    ...log,
    name: userMap.get(log.user) || 'Unknown User',
    printer: printerMap.get(log.printer) || 'Unknown Printer',
  }));


  return enrichedLogs;
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
