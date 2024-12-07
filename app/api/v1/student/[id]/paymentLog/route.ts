import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";

export async function GET(req: any, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();

    const query = `
        SELECT "u".*, "s".*, "pl"."id" as "paymentLogId", "pl"."date", "pl"."amount", "pl"."numberOfPage", "pl"."status"
        FROM "users" u
        JOIN "students" s ON "u"."id" = "s"."id"
        JOIN "PaymentLogs" pl ON "s"."id" = "pl"."user"
        WHERE "u"."id" = '${id}'
    `;

    try {
        const students = await AppDataSource.query(query)

        let returnData = students.map((student: any) => {
            console.log(student);
            return {
                id: student.paymentLogId,
                date: student.date,
                amount: student.amount,
                numberOfPage: student.numberOfPage,
                status: student.status,
            }
        });

        if (students.length) {
            const student = students[0];
            const studentInfo = {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                username: student.username,
                gender: student.gender,
                address: student.address,
                image: student.image,
                class: student.class,
                faculty: student.faculty,
            }
            returnData = { studentInfo, returnData }
        }

        return NextResponse.json(returnData);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

