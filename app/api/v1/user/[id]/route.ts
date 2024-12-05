import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { User, Student } from "@/models";

export async function GET(req: any, context: any) {
    const AppDataSource = await connectDB();
    const userRepository = AppDataSource.getRepository(User);
    const studentRepository = AppDataSource.getRepository(Student);

    const { id } = context.params;

    try {
        // get user
        let user = await userRepository.findOne({ where: { id: id } });

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // get student
        let student = await studentRepository.findOne({ where: { id: id } });
        if (!student) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        // omit user password
        user.password = undefined as any;
        user = { ...user, ...student };

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

// update user
export async function PATCH(req: any, context: any) {
    const AppDataSource = await connectDB()
    const userRepository = AppDataSource.getRepository(User)
    const studentRepository = AppDataSource.getRepository(Student)

    const { id } = context.params;

    try {
        const body = await req.json()

        const user = await userRepository.findOne({ where: { id: id } });
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
        if (body.name) {
            const name = body.name.split(' ');
            user.firstName = name[0].trim();
            user.lastName = body.name.replace(name[0], '').trim();
        } else {
            if (body.firstName) user.firstName = body.firstName;
            if (body.lastName) user.lastName = body.lastName;
        }
        if (body.email) user.email = body.email;
        if (body.username) user.username = body.username;
        if (body.address) user.address = body.address;
        if (body.gender) user.gender = body.gender === 'Male' ? true : false;
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