import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';

import { connectDB } from "@/db/connect"
import { User, Student, Spso } from "@/models"
import { signAccessToken, signRefreshToken } from "@/lib/jwt-token"
import { auth } from "@/middleware/auth/check-auth";

const saltRounds = 10;

// create user
export async function POST(req: any) {
    const AppDataSource = await connectDB();
    const userRepository = AppDataSource.getRepository(User);
    const studentRepository = AppDataSource.getRepository(Student);
    const spsoRepository = AppDataSource.getRepository(Spso);

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

        if (body.role === 'student') {
            const student = studentRepository.create({
                id: user.id,
                studentId: body.studentId,
                class: body.class,
                faculty: body.faculty,
                user: user,
            });
            await studentRepository.save(student);
        } else if (body.role === 'spso') {
            const spso = spsoRepository.create({
                id: user.id,
                user: user,
            });
            await spsoRepository.save(spso);
        }

        // omit password from response
        const { password, ...userData } = body;

        // sign access token and refresh token
        const accessToken = signAccessToken(user.id);
        const refreshToken = signRefreshToken(user.id);
        return NextResponse.json({ ...userData, accessToken, refreshToken });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

// get all users
export async function GET(req: any) {
    // check authentication
    const authResponse = auth(req)


    const AppDataSource = await connectDB()
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return NextResponse.json(users)
}

// update user
export async function PATCH(req: any) {
    const AppDataSource = await connectDB()
    const userRepository = AppDataSource.getRepository(User)
    const studentRepository = AppDataSource.getRepository(Student)
    const spsoRepository = AppDataSource.getRepository(Spso)

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