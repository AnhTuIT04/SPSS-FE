'use client';

import { useParams } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';


import PrintingLogTableWithId from '@/components/PrintTable/PrintingLogTableWithId';
import PaymentLogTableWithId from '@/components/PaymentTable/PaymentLogTableWithId';



type Student = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  page: number;
  image: string;
  address: string;
  class: string;
  faculty: string;
  gender: string;
};

const getStuddentData = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/v1/student/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const res = await response.json();
  const student = {
    id: res[0].id,
    name: res[0].firstName + ' ' + res[0].lastName,
    studentId: res[0].studentId,
    email: res[0].email,
    page: res[0].pages,
    image: res[0].image,
    gender: res[0].gender,
    class: res[0].class,
    faculty: res[0].faculty,
    address: res[0].address,
  }

  return student;

};

const updateRemainingPage = async (id: string, page: number) => {
  const response = await fetch(`http://localhost:3000/api/v1/student/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pages: page }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
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
  const [page, setPage] = useState(student.page);

  const [input, setInput] = useState(page.toString());

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleOnSave = async () => {
    try {
      await updateRemainingPage(student.id, parseInt(input));
      setPage(parseInt(input));
      setInput(page.toString());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-10 bg-white rounded-lg p-4 w-full">
      <div className="flex items-center gap-10">
        <img
          src={student.image}
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
        <InputWithLabel label="Gender" value={student.gender} disabled />

        <InputWithLabel label="Address" value={student.address} disabled />
      </div>

      <div className="flex flex-wrap w-full justify-between gap-10">
        <InputWithLabel label="Faculty" value={student.faculty} disabled />

        <InputWithLabel label="Class" value={student.class} disabled />
      </div>

      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="page">Remaining Page</Label>
        <div className="flex w-full max-w-xl items-center space-x-2">
          <Input type="string" value={page} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Remaining Pages</DialogTitle>
                <DialogDescription>
                  Edit the remaining pages for the student here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="defaultPage" className="text-right">
                    Remaining Pages
                  </Label>
                  <Input id="defaultPage" className="col-span-3" placeholder={input} onChange={handleOnChange} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button type="submit" onClick={handleOnSave}>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
      const data: any = await getStuddentData(id as string);
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
        <PrintingLogTableWithId id={Array.isArray(id) ? id[0] : id} />
      </TabsContent>
      <TabsContent value="payment" className="flex flex-col gap-10">
        <PaymentLogTableWithId id={Array.isArray(id) ? id[0] : id} />
      </TabsContent>
    </Tabs>
  );
};

export default StudentIdPage;
