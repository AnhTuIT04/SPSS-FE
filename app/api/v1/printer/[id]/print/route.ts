import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Printer, User, Student, PrintingLog } from "@/models";

export async function POST(req: any, context: any) {
    const AppDataSource = await connectDB();
    const userRepository = AppDataSource.getRepository(User);
    const studentRepository = AppDataSource.getRepository(Student);
    const printerRepository = AppDataSource.getRepository(Printer);
    const printingLogRepository = AppDataSource.getRepository(PrintingLog);

    const { id } = context.params;

    try {
        const body = await req.json()
        const userHeader = req.headers.get('X-User');
        if (!userHeader) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        body.user = JSON.parse(userHeader);

        // get user
        const user = await userRepository.findOne({ where: { id: body.user.id } });
        const student = await studentRepository.findOne({ where: { id: body.user.id } });

        if (!user || !student) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const printer = await printerRepository.findOne({ where: { id } });

        if (!printer) {
            return NextResponse.json({ message: 'Printer not found' }, { status: 404 });
        }

        const numberOfPage = body.numberOfPage;
        const fileType = body.fileType;

        // check remaining pages of user
        if (student.pages < numberOfPage) {
            return NextResponse.json({ message: 'You have no remaining pages' }, { status: 400 });
        }

        // check file type
        if (printer.fileType.indexOf(fileType) === -1) {
            return NextResponse.json({ message: 'File type is not supported' }, { status: 400 });
        }

        // create print job, update user pages and create print history
        student.pages -= numberOfPage;
        await studentRepository.save(student);

        const printingLog = printingLogRepository.create({
            user: body.user,
            date: body.date,
            fileName: body.fileName,
            fileType: body.fileType,
            numberOfPage: body.numberOfPage,
            printer: printer,
            status: 'Pending'
        })

        await printingLogRepository.save(printingLog);

        return NextResponse.json({ message: 'Print job created' }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}