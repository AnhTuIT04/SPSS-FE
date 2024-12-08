import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Printer } from "@/models";

export async function PATCH(req: any, context: any) {
    const { params } = context;
    const id = params.id as string;

    const AppDataSource = await connectDB();
    const printerRepository = AppDataSource.getRepository(Printer);

    try {
        // Parse the incoming request body.
        const body = await req.json();

        // Find the existing payment log by ID.
        const printer = await printerRepository.findOneBy({ id });
        if (!printer) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }

        // Update the payment log with new data.
        printerRepository.merge(printer, {
            name: body.name ?? printer.name, // Keep the existing value if not provided.
            location: body.location ?? printer.location,
            status: body.status ?? printer.status,
            image: body.image ?? printer.image,
            fileType: body.fileType ?? printer.fileType,
            pageSize: body.pageSize ?? printer.pageSize,
        });

        // Save the updated record.
        await printerRepository.save(printer);

        // Return the updated payment log.
        return NextResponse.json(printer);
    } catch (error) {
        console.error('Error updating payment log:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function GET(req: Request, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const printerRepository = AppDataSource.getRepository(Printer);
    try {
        const printer = await printerRepository.findOneBy({ id });
        if (!printer) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }
        return NextResponse.json(printer);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}
