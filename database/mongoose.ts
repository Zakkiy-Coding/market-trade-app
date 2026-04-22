import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    var mongooseChace: {
        conn: typeof mongoose | null,
        promise: Promise<typeof mongoose> | null
    }
}

let cached = global.mongooseChace

if(!cached) {
    cached = global.mongooseChace = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    if(cached.conn) return cached.conn;
    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false});
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn;
}