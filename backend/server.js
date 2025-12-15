require("dotenv").config({});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan")





// middile ware calling
app.use(express.json());
app.use(bodyParser.json());``
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));




app.get("/api/health", (req, res) => {
  res.status(200).json({message:"Success"})
});


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});



app.listen(PORT, () => console.log(`Your Server is running on ${PORT}`))