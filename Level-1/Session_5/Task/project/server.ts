import express, { Request, Response } from "express";
import router from "./routers/microbus.routers";

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("server is running");
});
