import mongoose from 'mongoose';

const MONGO_URL= process.env.MONGODB_URL;

if(!MONGO_URL) throw new Error("MONGO URL is not there in .env.local");

type Cache ={
    conn:typeof mongoose | null;
    promise:Promise<typeof mongoose> | null;
};

declare global {
    var mongooseCache: Cache | null;
};

const cached: Cache =global.mongooseCache ?? (global.mongooseCache={conn:null,promise:null});


export async function connectDB(){
    if(cached.conn) return cached.conn;

    if(!cached.conn){
        cached.promise = mongoose.connect(MONGO_URL!,{bufferCommands:false});

    }
    try {
        cached.conn= await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn;
}