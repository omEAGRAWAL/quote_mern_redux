import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.routes.js";
import dotenv from "dotenv";


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);




app.use((err,req,res,next)=>{
  const statuscode = res.statusCode || 500 ;
  const message = res.message || "Internal Server Error";
  res.status(statuscode).json({
    success:false,
    statuscode,
    message
  });
});
