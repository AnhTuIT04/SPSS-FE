import { NextResponse } from "next/server";
import { connectDB } from "@/db/connect";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: any, context: any) {
    const body = await req.json();
    const id = body.id as string;
    const numberOfPage = body.numberOfPage as number;
    const amount = body.amount as number;

    const AppDataSource = await connectDB();
    const paymentId = uuidv4();

    try {
        // Start a transaction
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Update the number of pages for the student
            await queryRunner.query(
                `UPDATE students SET pages = pages + ? WHERE id = ?`,
                [numberOfPage, id]
            );

            // Insert a new payment log
            await queryRunner.query(
                `INSERT INTO PaymentLogs (id, user, date, numberOfPage, amount, status) 
                 VALUES (?, ?, NOW(), ?, ?, 'Completed')`,
                [paymentId, id, numberOfPage, amount]
            );

            // Commit the transaction
            await queryRunner.commitTransaction();
            return NextResponse.json({ message: 'Transaction completed successfully' });
        } catch (error) {
            // Rollback the transaction on error
            await queryRunner.rollbackTransaction();
            console.error('Transaction failed:', error);
            return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({ message: 'Database connection failed' }, { status: 500 });
    }
}
