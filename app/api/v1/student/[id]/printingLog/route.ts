import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";

export async function GET(req: any, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();

    const query = `
        SELECT "u".*, "s".*, "pl"."id" as "printingLogId", "pl"."date", "pl"."fileName", "pl"."fileType", "pl"."numberOfPage", "pl"."printer", "pl"."status", "p"."name" AS "printerName"
        FROM "users" u
        JOIN "students" s ON "u"."id" = "s"."id"
        JOIN "PrintingLogs" pl ON "s"."id" = "pl"."user"
        JOIN "Printers" p ON "pl"."printer" = "p"."id"
        WHERE "u"."id" = '${id}'
    `;

    try {
        const students = await AppDataSource.query(query)
        let returnData = students.map((student: any) => {
            return {
                id: student.printingLogId,
                date: student.date,
                fileName: student.fileName,
                fileType: student.fileType,
                numberOfPage: student.numberOfPage,
                printer: student.printerName,
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

