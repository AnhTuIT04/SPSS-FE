import { NextRequest, NextResponse } from "next/server";

import auth from '@/middlewares/auth/check-auth'
import spso from '@/middlewares/auth/check-spso'

export default function handler(req: NextRequest) {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    // auth routes
    const AuthRoutes = [
        {
            method: 'PATCH',
            pathname: '/api/v1/user',
        },
    ]

    if (AuthRoutes.some(route => route.pathname === pathname && route.method === req.method)) {
        return auth(req);
    }

    return NextResponse.next();
}

