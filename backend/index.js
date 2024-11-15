import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js';
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
//import mongoose from 'mongoose';



dotenv.config({});

const app = express();

app.get("/home", (req,res)=>{
    return res.status(200).json({
        message: "Welcome to home page",
        success:true
    })
});


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin:['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}
app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
// // api's
// app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
//app.use("/api/v1/application", applicationRoute);

// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"
//http://localhost:8000/api/v1/user/register


app.listen(PORT,()=>{
    connectDB();
    
    console.log(`Server running at port ${PORT}`);
})

