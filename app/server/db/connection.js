import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("URI:", MONGODB_URI);

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    };
}

export const connectToDatabase = async () => {

    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing");
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "TP4AW2",
            bufferCommands: false
        });
    }

    cached.conn = await cached.promise;

    return cached.conn;
};