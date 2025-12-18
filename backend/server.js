import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import { clerkMiddleware } from '@clerk/express'
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { functions,inngest } from "./config/inngest.js";
import { serve } from "inngest/express";


const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));

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