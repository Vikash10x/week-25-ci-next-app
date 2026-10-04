import path from "node:path";
import dotenv from "dotenv";
import postgres from "@prisma/orm-postgres/runtime";

import type { Contract } from "./contract.js";
import contractJson from "./contract.json" with { type: "json" };

dotenv.config({ path: path.resolve(process.cwd(), "../../packages/prisma/.env") });

export const db = postgres<Contract>({
    contractJson,
    url: process.env.DATABASE_URL!,
});

let isDbConnected = false;

export async function connectDb() {
    if (isDbConnected) return;

    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not defined");

    await db.connect({ url });
    isDbConnected = true;
}

