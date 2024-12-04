import { NextResponse } from "next/server";
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';

import { connectDB } from "@/db/connect";
import { User, Student } from "@/models";

const saltRounds = 10;

export async function POST(req: any) {

    await connectDB();
    const userRepository = getRepository(User);
    const studentRepository = getRepository(Student);

    try {
        const body = await req.json();
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const user = userRepository.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashedPassword,
            username: body.username,
            role: body.role,
            gender: body.gender,
        });
        await userRepository.save(user);

        const student = studentRepository.create({
            id: user.id,
            studentId: body.studentId,
            class: body.class,
            faculty: body.faculty,
            user: user,
        });
        await studentRepository.save(student);

        return NextResponse.json({ ...body });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}