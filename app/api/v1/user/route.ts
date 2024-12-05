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

    try {
        const body = await req.json()
        const userHeader = req.headers.get('X-User');
        if (!userHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        body.user = JSON.parse(userHeader);

        const user = await userRepository.findOne({ where: { id: body.user.id } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Kiểm tra nếu email đang được thay đổi và giá trị mới đã tồn tại
        if (body.email && body.email !== user.email) {
            const existingUser = await userRepository.findOne({ where: { email: body.email } });
            if (existingUser) {
                return NextResponse.json({ message: 'Email already exists' }, { status: 409 }); // HTTP 409 Conflict
            }
        }

        // Cập nhật các thông tin khác
        if (body.firstName) user.firstName = body.firstName;
        if (body.lastName) user.lastName = body.lastName;
        if (body.email) user.email = body.email;
        if (body.username) user.username = body.username;
        if (body.address) user.address = body.address;
        if (body.gender) user.gender = body.gender;
        if (body.image) user.image = body.image;

        await userRepository.save(user);

        const student = await studentRepository.findOne({ where: { id: user.id } });

        if (user.role === 'student' && student) {
            if (body.studentId) student.studentId = body.studentId;
            if (body.class) student.class = body.class;
            if (body.faculty) student.faculty = body.faculty;

            await studentRepository.save(student);
        }

        return NextResponse.json({ ...user, ...student });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
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