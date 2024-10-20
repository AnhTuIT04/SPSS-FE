'use client';

import { useEffect, useState } from 'react';

import { printData } from '@/constants/spso';
import BarChartComponent from './BarChartComponent';

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
import { DatePickerWithRange } from '../PrintTable/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

interface PrinterFilterProps {
  selectedPrinter: string;
  setSelectedPrinter: (printer: string) => void;
}

const PrinterFilter = ({ selectedPrinter, setSelectedPrinter }: PrinterFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Printer</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Printer</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedPrinter} onValueChange={setSelectedPrinter}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Printer A">Printer A</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Printer B">Printer B</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Printer C">Printer C</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface FileTypeFilterProps {
  selectedFileType: string;
  setSelectedFileType: (fileType: string) => void;
}

const FileTypeFilter = ({ selectedFileType, setSelectedFileType }: FileTypeFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">File Type</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select File Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedFileType} onValueChange={setSelectedFileType}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PDF">DOCX</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="JPEG">JPEG</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DOCX">DOCX</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const BarChartAndFilter = () => {
  const [chartData, setChartData] = useState(printData);

  const [selectedFileType, setSelectedFileType] = useState('All');
  const [selectedPrinter, setSelectedPrinter] = useState('All');

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  useEffect(() => {
    const filteredData = printData.filter((log) => {
      const logDate = new Date(log.date);
      const isDateMatch = logDate >= date?.from && logDate <= date?.to;
      const isPrinterMatch = selectedPrinter === 'All' || log.printer === selectedPrinter;
      const isFileTypeMatch = selectedFileType === 'All' || log.fileType === selectedFileType;
      return isPrinterMatch && isFileTypeMatch && isDateMatch;
    });

    setChartData(filteredData);
  }, [selectedFileType, selectedPrinter, date]);

  const resetFilter = () => {
    setSelectedFileType('All');
    setSelectedPrinter('All');
    setDate({
      from: subDays(new Date(), 6),
      to: new Date(),
    });
  };

  return (
    <Card className='w-full'>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-bold">Printing Log</CardTitle>
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
              <DropdownMenuLabel>
                <PrinterFilter
                  selectedPrinter={selectedPrinter}
                  setSelectedPrinter={setSelectedPrinter}
                />
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <FileTypeFilter
                  selectedFileType={selectedFileType}
                  setSelectedFileType={setSelectedFileType}
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
        <BarChartComponent data={chartData} />
      </CardContent>
    </Card>
  );
};

export default BarChartAndFilter;
