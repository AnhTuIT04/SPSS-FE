'use client';

import { useParams } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import PrintingLogTable from '@/components/PrintTable/PrintingLogTable';
import PaymentLogTable from '@/components/PaymentTable/PaymentLogTable';

type Student = {
  id: number;
  name: string;
  studentId: string;
  email: string;
  page: number;
  image: string;
};

const getStuddentData = async (id: string) => {
  const response = await fetch(`https://67143dff690bf212c76102cb.mockapi.io/api/v1/student/${id}`);
  return response.json();
};

export function InputWithLabel({
  label,
  value,
  disabled,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <div className="grid w-full max-w-lg items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input type="text" id={label} value={value} disabled={disabled} />
    </div>
  );
}

const Profile = ({ student }: { student: Student }) => {
  return (
    <div className="flex flex-col gap-10 bg-white rounded-lg p-4 w-full">
      <div className="flex items-center gap-10">
        <Image
          priority
          src={`https://github.com/shadcn.png`}
          alt={student.name}
          width={150}
          height={150}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-xl">
            <h1>{student.name}</h1>
          </span>
          <span className="text-gray-500">
            <p>{student.email}</p>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap w-full justify-between gap-10">
        <InputWithLabel label="Full Name" value={student.name} disabled />
        <InputWithLabel label="Student ID" value={student.studentId} disabled />
      </div>

      <div className="flex flex-wrap w-full justify-between gap-10">
        <InputWithLabel label="Gender" value="Male" disabled />

        <InputWithLabel label="Address" value="BlaBlaBla" disabled />
      </div>

      <div className="flex flex-wrap w-full justify-between gap-10">
        <InputWithLabel label="Faculty" value="Computer Science and Engineering" disabled />

        <InputWithLabel label="Class" value="MT22KH08" disabled />
      </div>

      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="page">Remaining Page</Label>
        <div className="flex w-full max-w-xl items-center space-x-2">
          <Input type="string" value={student.page} />
          <Button type="submit">Edit</Button>
        </div>
      </div>
    </div>
  );
};



const StudentIdPage = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const data = await getStuddentData(id as string);
      setStudentData(data);
    };

    fetchStudentData();
  }, [id]);

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="printing">Printing</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="flex flex-col gap-10">
        {studentData && <Profile student={studentData} />}
      </TabsContent>
      <TabsContent value="printing" className="flex flex-col gap-10">
        <PrintingLogTable />
      </TabsContent>
      <TabsContent value="payment" className="flex flex-col gap-10">
        <PaymentLogTable />
      </TabsContent>
    </Tabs>
  );
};

export default StudentIdPage;
