import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { PrintingLog } from "@/models";


export async function POST(req: any) {

    const AppDataSource = await connectDB();
    const printingLogRepository = AppDataSource.getRepository(PrintingLog);

    try {
        const body = await req.json();

        const printingLog = printingLogRepository.create({
            user: body.user,
            date: body.date,
            fileName: body.fileName,
            fileType: body.fileType,
            numberOfPage: body.numberOfPage,
            printer: body.printer,
            status: body.status
        });
        await printingLogRepository.save(printingLog);


        return NextResponse.json({ ...printingLog });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET () {
    const AppDataSource = await connectDB();
    const printingLogRepository = AppDataSource.getRepository(PrintingLog);
    try {
        const printingLogs = await printingLogRepository.find();

        return NextResponse.json(printingLogs);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}