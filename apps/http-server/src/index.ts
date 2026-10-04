import express from "express";
import { connectDb, db } from "@repo/db";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Hi there");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body ?? {};

    if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).json({
            message: "Expected a JSON body with string username and password"
        });
        return;
    }

    const normalizedUsername = username.trim();
    if (normalizedUsername.length < 3 || password.length < 6) {
        res.status(400).json({
            message: "Username must be at least 3 characters and password at least 6 characters"
        });
        return;
    }

    const userModel = db.orm.public?.User;
    if (!userModel) {
        res.status(500).json({ message: "User model is unavailable" });
        return;
    }

    try {
        const user = await userModel.create({
            username: normalizedUsername,
            password: password
        });

        res.status(201).json({
            message: "Signup successful",
            id: user.id
        });
    } catch (error) {
        console.error("Signup failed:", error);
        res.status(500).json({ message: "Signup failed. Please try again." });
    }
});

async function start() {
    await connectDb();
    app.listen(3002, () => {
        console.log("HTTP server listening on port 3002");
    });
}

start().catch((error) => {
    console.error("DB connection failed:", error);
    process.exit(1);
});