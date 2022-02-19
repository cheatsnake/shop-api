import "dotenv/config";
import app from "./app";
import { connection } from "./configs/database.config";

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, async () => {
    try {
        await connection();
        console.log(`Server is running on port ${PORT}...`);
    } catch (error) {
        console.error(error);
    }
});
