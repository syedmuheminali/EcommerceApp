import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import { clerkMiddleware } from '@clerk/express'
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(clerkMiddleware())

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});


if(ENV.NODE_ENV === "development"){
  app.use(express.static(path.join(__dirname,"../admin/dist")))

  app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../admin","dist","index.html"))
  })
}


const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
};

startServer();