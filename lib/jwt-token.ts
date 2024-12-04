import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET || 'jwt-secret';
const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';

export function signAccessToken(userId: string) {
    const accessToken = jwt.sign({ id: userId }, jwtSecretKey, {
        expiresIn: '1d',
    });
    return accessToken;
}

export function signRefreshToken(userId: string) {
    const refreshToken = jwt.sign({ id: userId }, refreshTokenSecretKey, {
        expiresIn: '7d',
    });
    return refreshToken;
}
