import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs';

import { connectDB } from "@/db/connect"
import { User, Student, Spso } from "@/models"
import { signAccessToken, signRefreshToken } from "@/lib/jwt-token"

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
            image: body.role === 'student' ? 'https://files.edgestore.dev/m9qevt33wkdo0rzg/publicFiles/_public/2217f1ac-b900-4077-a791-7918c6923eed.jpg' :
                'https://files.edgestore.dev/m9qevt33wkdo0rzg/publicFiles/_public/51e5b944-fa2b-45f7-a6a3-2602be392ab0.png',
        });
        await userRepository.save(user);

        if (body.role === 'student') {
            const student = studentRepository.create({
                id: user.id,
                studentId: body.studentId,
                class: body.class,
                faculty: body.faculty,
                user: user.id,
            });
            await studentRepository.save(student);
        } else if (body.role === 'spso') {
            const spso = spsoRepository.create({
                id: user.id,
                user: user.id,
            });
            await spsoRepository.save(spso);
        }

        // omit password from response
        const { password, ...userData } = user;

        // sign access token and refresh token
        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);
        return NextResponse.json({ ...userData, accessToken, refreshToken });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

// get all users
export async function GET(req: any) {
    const AppDataSource = await connectDB()
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return NextResponse.json(users)
}

// delete user
export async function DELETE(req: any) {
    const AppDataSource = await connectDB();
    const userRepository = AppDataSource.getRepository(User);
    const studentRepository = AppDataSource.getRepository(Student);
    const spsoRepository = AppDataSource.getRepository(Spso);

    try {
        const { id } = await req.json();

        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (user.role === 'student') {
            await studentRepository.delete({ id: user.id });
        } else if (user.role === 'spso') {
            await spsoRepository.delete({ id: user.id });
        }

        await userRepository.delete({ id: user.id });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}