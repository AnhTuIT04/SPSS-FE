import { NextRequest, NextResponse } from "next/server";

import auth from '@/middlewares/auth/check-auth'
import spso from '@/middlewares/auth/check-spso'

export default function handler(req: NextRequest) {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    // auth routes
    const AuthRoutes = [
        {
            method: 'GET',
            pathname: '/api/v1/user',
        },
        {
            method: 'PATCH',
            pathname: '/api/v1/user',
        },
        {
            method: 'POST',
            pathname: '/api/v1/printer/[id]/print',
        }
    ]

    if (AuthRoutes.some(route => new RegExp(`^${route.pathname.replace(/\[.*?\]/g, '[^/]+')}$`).test(pathname) && route.method === req.method)) {
        return auth(req);
    }

    return NextResponse.next();
}

