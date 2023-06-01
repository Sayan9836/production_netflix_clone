const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://netflix-clone-nn3p.onrender.com/api/user');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

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



