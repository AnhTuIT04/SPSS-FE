'use client';

import { printingLogs } from '@/constants/spso';
import { PrintingLog, columns } from './columns';
import { DataTable } from './data-table';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DatePickerWithRange } from './DateRangePicker';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

// async function getData(): Promise<PrintingLog[]> {
//   // Fetch data from your API here.
//   return printingLogs;
// }

export default function DemoPage() {
  // const data = await getData();
  const [data, setData] = useState(printingLogs);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  useEffect(() => {
    const filteredData = printingLogs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= date?.from && logDate <= date?.to;
    });

    setData(filteredData);
  }, [date]);

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
