import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import 'dotenv/config'

interface TokenPayload extends JwtPayload {
    id: number;
    email: string;
    username: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token não informado"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
            email: string;
            username: string;
        };

        if (typeof decoded === "string") {
            return res.status(401).json({
                message: "Token inválido",
            });
        }

        req.user = decoded;

        next();

    } catch {

        return res.status(401).json({
            message: "Token expirado"
        });

    }

}