import { SignJWT, jwtVerify } from 'jose';

const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'jwt-secret');
const refreshTokenSecretKey = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET || 'refresh-secret');

export async function signAccessToken(userId: string) {
    const accessToken = await new SignJWT({ id: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .setIssuedAt()
        .sign(jwtSecretKey);

    return accessToken;
}

export async function signRefreshToken(userId: string) {
    const refreshToken = await new SignJWT({ id: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .setIssuedAt()
        .sign(refreshTokenSecretKey);

    return refreshToken;
}

export async function verifyToken(token: string, secretKey: Uint8Array) {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

export async function verifyAccessToken(token: string) {
    return verifyToken(token, jwtSecretKey);
}

export async function verifyRefreshToken(token: string) {
    return verifyToken(token, refreshTokenSecretKey);
}
