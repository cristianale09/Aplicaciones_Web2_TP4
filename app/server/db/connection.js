import mongoose from "mongoose";
import 'dotenv/config'

//guardamos en la constante la referencia a la url de mongoDB Compass
const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose || {conn: null, promise:null}

export const connectToDatabase = async () =>{
    //si ya existe la conexion nos la va a traer
    if (cached.conn) return cached.conn
    
    //sino la va a crear
    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')
    
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
        dbName: 'AW2_TP-4',
        bufferCommands: false
    })

    cached.conn = await cached.promise;

    return cached.conn
}