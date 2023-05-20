const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://6465ed6a698478000855cf32--mellow-torrone-a30106.netlify.app');
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
app.use(express.static(path.join(__dirname, '../netflix-frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../netflix-frontend/build/index.html'))
});
const DB = "mongodb+srv://sayanmaity631:gdcgdufuB7GdUS0i@cluster0.0muzrkn.mongodb.net/netflix?retryWrites=true&w=majority";
mongoose.connect(DB)




app.use("/api/user", userRoutes);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server is running on ${port}`);
});