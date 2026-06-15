import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import 'dotenv/config';

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const verifyToken = (token) => {
    if (!token) {
        return false;
    }

    try {
        jwt.verify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

export const decodedToken = async (token) => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return false;
    }
}

