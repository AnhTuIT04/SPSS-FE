'use client';

import { useParams } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

interface ProfileProps {
  student: Student;
}

const Profile = ({ student }: { student: Student }) => {
  return (
    <div>
      <div className="flex">
        <Image
          priority
          src={`https://github.com/shadcn.png`}
          alt={student.name}
          width={200}
          height={200}
        />
        <span className="font-semibold">
          <h1>{student.name}</h1>
        </span>
      </div>
    </div>
  );
};

const StudentProfile = () => {
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
      <TabsContent value="printing" className="flex flex-col gap-10"></TabsContent>
      <TabsContent value="payment" className="flex flex-col gap-10"></TabsContent>
    </Tabs>
  );
};

export default StudentProfile;
