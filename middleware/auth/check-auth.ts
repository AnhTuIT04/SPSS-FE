import { NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET || 'jwt-secret';

export function auth(handler: NextApiHandler) {
    return async (req: any, res: NextApiResponse) => {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            req.user = jwt.verify(accessToken, jwtSecretKey);
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}