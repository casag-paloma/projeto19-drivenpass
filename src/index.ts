import dotenv from "dotenv";
import express, {json} from "express";
import 'express-async-errors';
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import router from "./routes";

dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, ()=> {
    console.log(`Servidor is running on:${PORT}`);
})