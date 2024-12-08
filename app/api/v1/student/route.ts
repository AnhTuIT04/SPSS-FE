import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Student } from "@/models";



export async function GET () {
    
    const AppDataSource = await connectDB();
    const query = `
        SELECT "u".*, "s".*
        FROM "users" u
        JOIN "students" s ON "u"."id" = "s"."id"
    `;

    try {
        const students = await AppDataSource.query(query)

        return NextResponse.json(students);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}