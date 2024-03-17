const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
// const corsAnywhere = require('cors-anywhere');
require("dotenv").config();
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../netflix-frontend/build")));

app.use("/api/user", userRoutes);

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../netflix-frontend/build/index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
