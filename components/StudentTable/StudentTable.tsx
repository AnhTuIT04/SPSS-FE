'use client';

import { Student as StudentType, columns } from './columns';
import { DataTable } from './data-table';
import { connectDB } from "@/db/connect";
import { Student } from "@/models";
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

async function getData(): Promise<StudentType[]> {
  const response = await fetch('http://localhost:3000/api/v1/user');

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const students: StudentType[] = await response.json();

  const studentRes = await fetch('http://localhost:3000/api/v1/student');
  const studentList: {id: string; pages: number; studentId: string}[] = await studentRes.json();


  const studentMap = new Map(studentList.map((student) => [student.id, student.pages]));
  const studentIdMap = new Map(studentList.map((student) => [student.id, student.studentId]));
  const modifiedStudents = students.map((student) => ({
    ...student,
    page: studentMap.get(student.id) || 10,
    name: student.firstName + ' ' + student.lastName,
    studentId: studentIdMap.get(student.id) || 'Unknown Student ID',
  }));
  return modifiedStudents;
}

export default function DemoPage() {
  // const data = await getData();
  const [data, setData] = useState<StudentType[]>([]);

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
