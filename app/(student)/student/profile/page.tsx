'use client'

import React from 'react'
import { useEffect, useState } from 'react';
import studentAvatar from '@/public/assets/student.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


interface Student {
    name: String,
    ID: String,
    gender: String,
    address: String,
    faculty: String,
    class: String,
    email: String
}



const InfoItem = ({ label, info, onEdit }: { label: any, info: any, onEdit: any }) => {
    const [information, setInformation] = useState(info)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(e.target.value); // Update state with the new value
    };

    const handleSave = () => {
        onEdit(information); // Call the onEdit function with the updated information
    };

    return (
        <div className='my-[24px]'>
            <div className='text-[15px] text-[#000000]'>{label}</div>
            <div className='flex items-center gap-2'>
                <div
                    className='flex items-center my-[8px] px-[24px] w-[400px] max-lg:w-full h-[40px] bg-[#f9f9f9] rounded-[7.5px] text-[15px] text-[#959595]'>
                    {information}
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Student's {label}</DialogTitle>
                            <DialogDescription>
                                Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="defaultPage" className="text-right">
                                    {label}
                                </Label>
                                <Input id="defaultPage" placeholder={information} className="col-span-3" onChange={(e) => handleOnChange(e)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" onClick={handleSave}>Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

const Page = () => {
    // const [student, setStudent] = useState({
    //     name: 'Nguyen Van A',
    //     email: 'nguyenvana@example.com',
    //     ID: '2210001',
    //     gender: 'Female',
    //     class: 'MT22KH08',
    //     faculty: 'Computer Science & Engineering',
    //     address: '123 Street, Ho Chi Minh City',
    // });

    const [student, setStudent] = useState<Student>({
        name: "",
        ID: "",
        gender: "",
        address: "",
        faculty: "",
        class: "",
        email: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Gửi request đến API
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch('https://673760e4aafa2ef222339c88.mockapi.io/student/2'); // Thay bằng URL của API
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                const data = await response.json();
                setStudent(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, []);

    const handleUpdateStudent = async (student: Student) => {
        try {
            const response = await fetch('https://673760e4aafa2ef222339c88.mockapi.io/student/2', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });

            const data = await response.json();

            if (response.ok) {
                setStudent(data)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    };



    // Hiển thị loading hoặc lỗi
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='flex flex-col w-full bg-[#ffffff] rounded-[9.36111px] p-8'>
            <div className="flex items-center">
                <Image
                    src={studentAvatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mr-4"
                ></Image>
                <div className='flex flex-col justify-center'>
                    <span className='font-medium text-[20px]'>{student.name}</span>
                    <span className='font-medium text-[15px] text-[#000000] opacity-50'>{student.email}</span>
                </div>
            </div>
            <div className='flex  gap-20 max-lg:gap-1'>
                <div className='max-lg:w-full'>
                    {/* Full Name */}
                    <InfoItem label="Full Name" info={student.name} onEdit={(newName: String) => (handleUpdateStudent({ ...student, name: newName }))} />
                    {/* Gender */}
                    <InfoItem label="Gender" info={student.gender} onEdit={(newGender: String) => (handleUpdateStudent({ ...student, gender: newGender }))} />
                    {/* Faculty */}
                    <InfoItem label="Faculty" info={student.faculty} onEdit={(newFaculty: String) => (handleUpdateStudent({ ...student, faculty: newFaculty }))} />
                    {/* Email */}
                    <InfoItem label="Email" info={student.email} onEdit={(newEmail: String) => (handleUpdateStudent({ ...student, email: newEmail }))} />
                </div>
                <div className='max-lg:w-full'>
                    {/* ID */}
                    <InfoItem label="Student ID" info={student.ID} onEdit={(newID: String) => (handleUpdateStudent({ ...student, ID: newID }))} />
                    {/* Address */}
                    <InfoItem label="Address" info={student.address} onEdit={(newAddress: String) => (handleUpdateStudent({ ...student, address: newAddress }))} />
                    {/* Class */}
                    <InfoItem label="Class" info={student.class} onEdit={(newClass: String) => (handleUpdateStudent({ ...student, class: newClass }))} />
                </div>
            </div>
        </div >
    )
}

export default Page