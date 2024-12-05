import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { PrintingLog } from "@/models";



export async function PATCH(req: any, context: any) {
    const { params } = context;
    const id = params.id as string;

    const AppDataSource = await connectDB();
    const printingLogRepository = AppDataSource.getRepository(PrintingLog);

    try {
        // Parse the incoming request body.
        const body = await req.json();

        // Find the existing payment log by ID.
        const printingLog = await printingLogRepository.findOneBy({ id });
        if (!printingLog) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }

        // Update the payment log with new data.
        printingLogRepository.merge(printingLog, {
            user: body.user ?? printingLog.user, // Keep the existing value if not provided.
            date: body.date ?? printingLog.date,
            numberOfPage: body.numberOfPage ?? printingLog.numberOfPage,
            fileName: body.fileName ?? printingLog.fileName,
            fileType: body.fileType ?? printingLog.fileType,
            printer: body.printer ?? printingLog.printer,
            status: body.status ?? printingLog.status,
        });

        // Save the updated record.
        await printingLogRepository.save(printingLog);

        // Return the updated payment log.
        return NextResponse.json(printingLog);
    } catch (error) {
        console.error('Error updating payment log:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function GET(req: Request, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const printingLogRepository = AppDataSource.getRepository(PrintingLog);
    try {
        const printingLog = await printingLogRepository.findOneBy({ id });
        if (!printingLog) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }
        return NextResponse.json({ printingLog });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}
