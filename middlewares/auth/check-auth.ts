import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt-token";

export default async function auth(req: any) {
    const { headers } = req;
    let token = headers.get('Authorization') || '';

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    token = token.replace('Bearer ', '');

    try {
        const user = await verifyAccessToken(token);

        // Truyền thông tin user qua header
        const response = NextResponse.next();
        response.headers.set('X-User', JSON.stringify(user));
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
    }
}
