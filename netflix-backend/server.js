const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://main--mellow-torrone-a30106.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }
  
  next();
});

app.use(cors());
app.use(express.json());

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) =>
    console.error("Error connecting to MongoDB Atlas:", error)
  );




app.use(express.static(path.resolve(__dirname, 'netflix-frontend/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'netflix-frontend', 'build', 'index.html'))
});




app.use("/api/user", userRoutes);

const port =process.env.PORT|| 8000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});



