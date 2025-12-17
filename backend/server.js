import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import { ENV } from "./config/env.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});


if(ENV.NODE_ENV === "development"){
  app.use(express.static(path.join(__dirname,"../admin/dist")))

  app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../admin","dist","index.html"))
  })
}

app.listen(ENV.PORT, () =>
  console.log(`Your Server is running on ${ENV.PORT}`)
);
