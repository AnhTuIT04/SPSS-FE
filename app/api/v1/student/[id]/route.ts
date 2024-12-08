import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Student } from "@/models";

export async function GET(req: any, context: any) {

    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const query = `
        SELECT "u".*, "s".*
        FROM "users" u
        JOIN "students" s ON "u"."id" = "s"."id"
        WHERE "u"."id" = '${id}'
    `;
    try {
        const student = await AppDataSource.query(query)

        return NextResponse.json(student);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function PATCH(req: any, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const studentRepository = AppDataSource.getRepository(Student);

    try {
        const body = await req.json();
        const student = await studentRepository.findOneBy({ id });

        if (!student) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        studentRepository.merge(student, {
            studentId: body.studentId ?? student.studentId,
            class: body.class ?? student.class,
            faculty: body.faculty ?? student.faculty,
            pages: body.pages ?? student.pages,
        });

        await studentRepository.save(student);

        return NextResponse.json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}