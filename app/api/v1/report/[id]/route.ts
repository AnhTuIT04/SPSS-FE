import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Report } from "@/models";



export async function PATCH(req: any, context: any) {
    const { params } = context;
    const id = params.id as string;

    const AppDataSource = await connectDB();
    const reportRepository = AppDataSource.getRepository(Report);

    try {
        // Parse the incoming request body.
        const body = await req.json();

        // Find the existing payment log by ID.
        const report = await reportRepository.findOneBy({ id });
        if (!report) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }

        // Update the payment log with new data.
        reportRepository.merge(report, {
            name: body.name ?? report.name, 
            date: body.date ?? report.date,
            type: body.type ?? report.type,
        });

        // Save the updated record.
        await reportRepository.save(report);

        // Return the updated payment log.
        return NextResponse.json(report);
    } catch (error) {
        console.error('Error updating payment log:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function GET(req: Request, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const reportRepository = AppDataSource.getRepository(Report);
    try {
        const report = await reportRepository.findOneBy({ id });
        if (!report) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }
        return NextResponse.json({ report });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}
