'use client';

import { Report, columns } from './columns';
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
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';
import { DatePickerWithRange } from './DateRangePicker';

async function getData(): Promise<Report[]> {
  const response = await fetch('https://671bd0b12c842d92c38167df.mockapi.io/api/v1/report');

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const reports: Report[] = await response.json();

  return reports;
}

interface ReportTypeFilterProps {
  selectedReportType: string;
  setSelectedReportType: (reportType: string) => void;
}

const ReportTypeFilter = ({ selectedReportType, setSelectedReportType }: ReportTypeFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">File Type</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select File Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedReportType} onValueChange={setSelectedReportType}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Printing">Printing</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Payment">Payment</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function ReportTable() {
  // const data = await getData();
  const [data, setData] = useState<Report[]>([]);
  const [tableData, setTableData] = useState<Report[]>([]);
  const [reportType, setReportType] = useState<string>('All');
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  // Fetching payment data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData); // No need to spread, just set fetched data
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((report) => {
      const reportDate = new Date(report.date);
      const isDateMatch =
        reportDate >= (date?.from ?? new Date(0)) && reportDate <= (date?.to ?? new Date());
      const isReportTypeMatch =
        reportType === 'All' || report.type === (reportType === 'Printing' ? true : false);
      return isReportTypeMatch && isDateMatch;
    });

    setTableData(filteredData);
  }, [date, reportType]);

  const resetFilter = () => {
    setReportType('All');
    setDate({
      from: subDays(new Date(), 6),
      to: new Date(),
    });
  };

  return (
    <ScrollArea className="max-lg:hidden whitespace-nowrap rounded-md border">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-bold">Report Info</CardTitle>
          <CardDescription className='flex flex-wrap gap-2'>
            {/* Filter */}
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
                <DropdownMenuLabel>
                  <ReportTypeFilter
                    selectedReportType={reportType}
                    setSelectedReportType={setReportType}
                  />
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
          <DataTable columns={columns} data={tableData} />
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
