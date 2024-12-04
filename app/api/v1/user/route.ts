import { NextResponse } from "next/server"
import { getRepository } from "typeorm"
import bcrypt from 'bcryptjs';

import { connectDB } from "@/db/connect"
import { User, Student, Spso } from "@/models"

// get all users
export async function GET(req: any) {
    await connectDB()
    const userRepository = getRepository(User)

    const users = await userRepository.find()

    return NextResponse.json(users)
}

// login user
export async function POST(req: any) {
    await connectDB()
    const userRepository = getRepository(User)
    const studentRepository = getRepository(Student)
    const spsoRepository = getRepository(Spso)

    try {
        const body = await req.json()

        const user = await userRepository.findOne({ where: { email: body.email } });

        if (!user) {
            return NextResponse.json({ message: 'Email or password are incorrect' }, { status: 404 })
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ message: 'Email or password are incorrect' }, { status: 404 })
        }

        const { password, ...userData } = user

        let userDetails = null
        if (userData.role === 'student') {
            userDetails = await studentRepository.findOne({ where: { id: userData.id } });
        } else if (userData.role === 'spso') {
            userDetails = await spsoRepository.findOne({ where: { id: userData.id } });
        }

        return NextResponse.json({ ...userData, ...userDetails })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function PATCH(req: any) {
    await connectDB()
    const userRepository = getRepository(User)
    const studentRepository = getRepository(Student)
    const spsoRepository = getRepository(Spso)

    try {
        const body = await req.json()

        const user = await userRepository.findOne({ where: { id: body.id } });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }

        const { password, ...userData } = user

        let userDetails = null
        if (userData.role === 'student') {
            userDetails = await studentRepository.findOne({ where: { id: userData.id } });
        } else if (userData.role === 'spso') {
            userDetails = await spsoRepository.findOne({ where: { id: userData.id } });
        }

        return NextResponse.json({ ...userData, ...userDetails })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}