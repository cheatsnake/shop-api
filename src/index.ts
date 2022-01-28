import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connection } from "./configs/database.config";

const PORT: number = Number(process.env.PORT) || 5000;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Server is work");
});

app.listen(PORT, () => {
    connection();
    console.log(`Server is running on port ${PORT}...`);
});
