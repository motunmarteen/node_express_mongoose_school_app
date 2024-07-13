import dotenv from "dotenv";
dotenv.config()
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoutes.js";

dbConnect();
const app = express(); 

// .listen() method is for node.
app.listen(4242, () => console.log("Server is running"));

app.use(express.json());


// @Routes 
app.use('/api/v1/users/', userRoutes);


export default app;