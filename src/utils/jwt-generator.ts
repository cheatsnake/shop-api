import "dotenv/config";
import jwt from "jsonwebtoken";

export function generateJwt(id: number, email: string, role: string) {
    return jwt.sign(
        {
            id,
            email,
            role,
        },
        String(process.env.JWT_SECRET),
        {
            expiresIn: "1h",
        }
    );
}
