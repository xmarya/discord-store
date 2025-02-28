import mongoose from "mongoose";


export async function dbStartConnection() {
    const db = process.env.LOCAL_DB;

    try {
        // for connecting to MongoDB Atlas, TLS/SSL is enabled by default.
        await mongoose.connect(db, {tls: true});

    } catch (error) {
        console.error("couldn't establish a connection with the db.", error.message);
    }
}