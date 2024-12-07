import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";

export async function GET(req: any, context: any) {
    const AppDataSource = await connectDB();

    const query = `
        SELECT "u".*, "s".*, "pl"."id" as "printingLogId", "pl"."date", "pl"."fileName", "pl"."fileType", "pl"."numberOfPage", "pl"."printer", "pl"."status"
        FROM "users" u
        JOIN "students" s ON "u"."id" = "s"."id"
        JOIN "PrintingLogs" pl ON "s"."id" = "pl"."user"
    `;

    try {
        const students = await AppDataSource.query(query)

        return NextResponse.json(students);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

