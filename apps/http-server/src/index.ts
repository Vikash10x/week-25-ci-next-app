import express from "express";
import { connectDb, db } from "@repo/db";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hii their");
})

app.post("/signup", async (req, res) => {
    console.log(req.headers["content-type"]);
    console.log(req.body);
    const { username, password } = req.body ?? {};
    if (typeof username !== "string" || typeof password !== "string") {
        res.status(400).json({
            message: "Expected a JSON body with string username and password"
        });
        return;
    }

    const userModel = db.orm.public?.User;
    if (!userModel) {
        res.status(500).json({ message: "User model is unavailable" });
        return;
    }

    const user = await userModel.create({
        username: username,
        password: password
    });
    res.json({
        message: "Signup Successful",
        id: user.id
    })
})


async function start() {
    await connectDb();
    app.listen(3002);
}

start().catch((error) => {
    console.error("DB connection failed:", error);
    process.exit(1);
});