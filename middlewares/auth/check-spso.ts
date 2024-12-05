import { NextResponse } from "next/server";

import { connectDB } from "@/db/connect";
import { Spso } from "@/models";

export default async function spso(req: any) {
    const AppDataSource = await connectDB();
    const spsoRepository = AppDataSource.getRepository(Spso);

    const { user } = req;

    try {
        const spso = await spsoRepository.findOne({ where: { id: user.id } });
        if (!spso) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        NextResponse.next();
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
    }
}
