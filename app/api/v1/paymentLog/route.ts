import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { PaymentLog } from "@/models";


export async function POST(req: any) {

    const AppDataSource = await connectDB();
    const paymentLogRepository = AppDataSource.getRepository(PaymentLog);

    try {
        const body = await req.json();

        const paymentLog = paymentLogRepository.create({
            user: body.user,
            date: body.date,
            numberOfPage: body.numberOfPage,
            amount: body.amount,
            status: body.status
        });
        await paymentLogRepository.save(paymentLog);


        return NextResponse.json({ ...paymentLog });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function GET () {
    const AppDataSource = await connectDB();
    const paymentLogRepository = AppDataSource.getRepository(PaymentLog);
    try {
        const paymentLogs = await paymentLogRepository.find();

        return NextResponse.json({ paymentLogs });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}