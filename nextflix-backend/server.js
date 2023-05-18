const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../netflix-frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../netflix-frontend/build/index.html'))
});
const DB = "mongodb+srv://sayanmaity631:gdcgdufuB7GdUS0i@cluster0.0muzrkn.mongodb.net/netflix?retryWrites=true&w=majority";
mongoose.connect(DB)

app.use((req,res,next)=>{
 res.header('Access-Control-Allow-Origin', '*');
 next();
})


app.use("/api/user", userRoutes);

app.listen(5000);