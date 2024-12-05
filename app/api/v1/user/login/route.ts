import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';

import { connectDB } from "@/db/connect"
import { User, Student, Spso } from "@/models"
import { signAccessToken, signRefreshToken } from "@/lib/jwt-token";

// login
export async function POST(req: any) {
    const AppDataSource = await connectDB()
    const userRepository = AppDataSource.getRepository(User)
    const studentRepository = AppDataSource.getRepository(Student)
    const spsoRepository = AppDataSource.getRepository(Spso)

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

        // omit password from response
        const { password, ...userData } = user

        let userDetails = null
        if (userData.role === 'student') {
            userDetails = await studentRepository.findOne({ where: { id: userData.id } });
        } else if (userData.role === 'spso') {
            userDetails = await spsoRepository.findOne({ where: { id: userData.id } });
        }

        // sign access token and refresh token
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        return NextResponse.json({ ...userData, ...userDetails, accessToken, refreshToken });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}