import express from 'express';
import dotenv from 'dotenv';
import cookieparser from "cookie-parser";
import {router} from "./router/router"
dotenv.config();


const app = express();

const Port = process.env.port || 3000;

app.use(cookieparser());
app.use(express.json());

app.use("/auth", router);

app.listen(Port, ()=>{
    console.log("Server is running");
})
