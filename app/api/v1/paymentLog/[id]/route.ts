import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { PaymentLog } from "@/models";



export async function PATCH(req: any, context: any) {
    const { params } = context;
    const id = params.id as string;

    const AppDataSource = await connectDB();
    const paymentLogRepository = AppDataSource.getRepository(PaymentLog);

    try {
        // Parse the incoming request body.
        const body = await req.json();

        // Find the existing payment log by ID.
        const paymentLog = await paymentLogRepository.findOneBy({ id });
        if (!paymentLog) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }

        // Update the payment log with new data.
        paymentLogRepository.merge(paymentLog, {
            user: body.user ?? paymentLog.user, // Keep the existing value if not provided.
            date: body.date ?? paymentLog.date,
            numberOfPage: body.numberOfPage ?? paymentLog.numberOfPage,
            amount: body.amount ?? paymentLog.amount,
            status: body.status ?? paymentLog.status,
        });

        // Save the updated record.
        await paymentLogRepository.save(paymentLog);

        // Return the updated payment log.
        return NextResponse.json(paymentLog);
    } catch (error) {
        console.error('Error updating payment log:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function GET(req: Request, context: any) {
    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const paymentLogRepository = AppDataSource.getRepository(PaymentLog);
    try {
        const paymentLog = await paymentLogRepository.findOneBy({ id });
        if (!paymentLog) {
            return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
        }
        return NextResponse.json({ paymentLog });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

// export async function DELETE(req: any, context: any) {
//     const { params } = context;

//     const id = params.id as string;

//     const AppDataSource = await connectDB();
//     const paymentLogRepository = AppDataSource.getRepository(PaymentLog);
//     try {
//         const paymentLog = await paymentLogRepository.findOneBy({ id });
//         if (!paymentLog) {
//             return NextResponse.json({ message: 'Payment log not found' }, { status: 404 });
//         }
//         await paymentLogRepository.remove(paymentLog);
//         return NextResponse.json({ paymentLog });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: 'Something went wrong', context: context }, { status: 500 })
//     }
// }