'use client'

import React from 'react'
import axios from 'axios';
import { useState } from 'react';

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
    address: String,
    class: String,
    email: String,
    faculty: String,
    gender: Boolean | String,
    id: String,
    image: String,
    name: String,
    studentId: String,
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
                    {info}
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
                                <Label htmlFor="defaultProfile" className="text-right">
                                    {label}
                                </Label>
                                <Input id="defaultProfile" placeholder={information} className="col-span-3" onChange={(e) => handleOnChange(e)} />
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

interface Props {
    user: Student
}

const Profile = ({ user }: Props) => {
    const [student, setStudent] = useState<Student>({
        name: user.name,
        studentId: user.studentId,
        gender: user.gender,
        address: user.address,
        faculty: user.faculty,
        class: user.class,
        email: user.email,
        image: user.image,
        id: user.id
    });

    const handleUpdateStudent = async (student: Student) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/user/${student.id}`, student);

            const data = response.data;
            const name = data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1) + ' ' + data.lastName.charAt(0).toUpperCase() + data.lastName.slice(1);
            data.name = name;

            if (response.status === 200) {
                setStudent(data)
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='flex flex-col w-full bg-[#ffffff] rounded-[9.36111px] p-8'>
            <div className="flex items-center">
                <img
                    src={student.image as any || '/assets/guest.png'}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover mr-4"
                ></img>
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
                    <InfoItem label="Gender" info={student.gender ? "Male" : "Female"} onEdit={(newGender: String) => (handleUpdateStudent({ ...student, gender: newGender }))} />
                    {/* Faculty */}
                    <InfoItem label="Faculty" info={student.faculty} onEdit={(newFaculty: String) => (handleUpdateStudent({ ...student, faculty: newFaculty }))} />
                    {/* Email */}
                    <InfoItem label="Email" info={student.email} onEdit={(newEmail: String) => (handleUpdateStudent({ ...student, email: newEmail }))} />
                </div>
                <div className='max-lg:w-full'>
                    {/* ID */}
                    <InfoItem label="Student ID" info={student.studentId} onEdit={(newID: String) => (handleUpdateStudent({ ...student, studentId: newID }))} />
                    {/* Address */}
                    <InfoItem label="Address" info={student.address} onEdit={(newAddress: String) => (handleUpdateStudent({ ...student, address: newAddress }))} />
                    {/* Class */}
                    <InfoItem label="Class" info={student.class} onEdit={(newClass: String) => (handleUpdateStudent({ ...student, class: newClass }))} />
                </div>
            </div>
        </div >
    )
}

export default Profile