import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Report } from "@/models";


export async function POST(req: any) {

    const AppDataSource = await connectDB();
    const reportRepository = AppDataSource.getRepository(Report);

    try {
        const body = await req.json();

        const report = reportRepository.create({
            name: body.name,
            date: body.date,
            type: body.type,
            link: body.link,
        });
        await reportRepository.save(report);


        return NextResponse.json(report);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET () {
    const AppDataSource = await connectDB();
    const reportRepository = AppDataSource.getRepository(Report);
    try {
        const reports = await reportRepository.find();

        return NextResponse.json(reports);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}