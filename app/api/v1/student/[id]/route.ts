import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Student } from "@/models";

export async function GET(req: any, context: any) {

    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const studentRepository = AppDataSource.getRepository(Student);
    try {
        const students = await studentRepository.findOneBy({ id });

        return NextResponse.json(students);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

