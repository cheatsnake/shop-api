import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { connection } from "./configs/database.config";
import { productRouter } from "./routes/product.router";
import { categoryRouter } from "./routes/category.router";
import { userRouter } from "./routes/user.router";

const PORT: number = Number(process.env.PORT) || 5000;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Server is work");
});

app.listen(PORT, async () => {
    try {
        await connection();
        console.log(`Server is running on port ${PORT}...`);
    } catch (error) {
        console.error(error);
    }
});
