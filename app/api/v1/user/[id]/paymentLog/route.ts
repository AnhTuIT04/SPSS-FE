import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { PaymentLog } from "@/models";


export async function GET(req: Request, context: any) {
    const { params } = context;

    const user = params.id as string;

    const AppDataSource = await connectDB();
    const paymentLogRepository = AppDataSource.getRepository(PaymentLog);
    try {
        const paymentLog = await paymentLogRepository.findBy({ user });
        if (!paymentLog) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }
        return NextResponse.json(paymentLog);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}
