import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { User } from "@/models";



export async function GET (req: any, context: any) {

    const { params } = context;

    const id = params.id as string;

    const AppDataSource = await connectDB();
    const userRepository = AppDataSource.getRepository(User);
    try {
        const students = await userRepository.findOneBy({ id });

        return NextResponse.json(students);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}

export async function PATCH(req: any, context: any) {
    const { params } = context;
    const id = params.id as string;

    const AppDataSource = await connectDB();
    const userRepository = AppDataSource.getRepository(User);

    try {
        // Parse the incoming request body.
        const body = await req.json();

        // Find the existing payment log by ID.
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            return NextResponse.json({ message: 'User log not found' }, { status: 404 });
        }

        // Update the payment log with new data.
        userRepository.merge(user, {
            firstName: body.firstName || user.firstName,
            lastName: body.lastName || user.lastName,
            email: body.email || user.email,
            gender: body.gender !== undefined ? body.gender : user.gender,
            address: body.address || user.address,
            password: body.password || user.password,
            username: body.username || user.username,
            image: body.image || user.image,
            pages: body.pages !== undefined ? body.pages : user.pages,
            role: body.role || user.role,
        });

        // Save the updated record.
        await userRepository.save(user);

        // Return the updated payment log.
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error updating payment log:', error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}