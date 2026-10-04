import path from "node:path";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { connectDb, db } from "@repo/db";

dotenv.config({ path: path.resolve(__dirname, "../../../packages/prisma/.env") });

const server = new WebSocketServer({
    port: 3001,
});

async function start() {
    await connectDb();

    server.on("connection", async (socket) => {
        await db.orm.public.User.create({
            username: Math.random().toString(),
            password: Math.random().toString(),
        
        });

        socket.send("Hii there you are connected to the server");
    });
}

start().catch((error) => {
    console.error("DB connection failed:", error);
    process.exit(1);
});