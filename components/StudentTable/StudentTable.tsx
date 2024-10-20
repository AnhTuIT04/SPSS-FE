'use client';

import { printingLogs } from '@/constants/spso';
import { Student, columns } from './columns';
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
import { useEffect, useState } from 'react';

async function getData(): Promise<Student[]> {
  const response = await fetch('https://67143dff690bf212c76102cb.mockapi.io/api/v1/student');

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const students: Student[] = await response.json();

  return students;
}

export default function DemoPage() {
  // const data = await getData();
  const [data, setData] = useState<Student[]>([]);

  // Fetching payment data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData); // No need to spread, just set fetched data
    };
    fetchData();
  }, []);

  return (
    <ScrollArea className="max-lg:hidden whitespace-nowrap rounded-md border">
      <Card>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
