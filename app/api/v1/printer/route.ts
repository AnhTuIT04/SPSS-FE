import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Printer } from "@/models";


export async function POST(req: any) {

    const AppDataSource = await connectDB();
    const printerRepository = AppDataSource.getRepository(Printer);

    try {
        const body = await req.json();

        const printer = printerRepository.create({
            image: body.image !== '' ? body.image : 'https://files.edgestore.dev/m9qevt33wkdo0rzg/publicFiles/_public/adc9b825-f911-464a-ae07-fd15a9bcffae.png',
            name: body.name,
            fileType: body.fileType,
            location: body.location,
            pageSize: body.pageSize,
            status: body.status
        });
        await printerRepository.save(printer);

        return NextResponse.json({ ...body });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET() {
    const AppDataSource = await connectDB();
    const printerRepository = AppDataSource.getRepository(Printer);
    try {
        const printers = await printerRepository.find();

        return NextResponse.json(printers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}