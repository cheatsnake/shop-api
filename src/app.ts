import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRouter } from "./routes/product.router";
import { categoryRouter } from "./routes/category.router";
import { userRouter } from "./routes/user.router";
import { errorMiddleware } from "./middlewares/error.middleware";
import { cartRouter } from "./routes/cart.router";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", userRouter);
app.use("/api", cartRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Server is work");
});
app.use(errorMiddleware);

export default app;
