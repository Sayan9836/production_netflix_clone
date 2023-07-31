const router = require("express").Router();
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  createUser,
  LogUser,
} = require("../controllers/UserController");

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  // res.send(token);
  console.log("middleware called", token);
  if (token) {
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send("please provide valid token");
      } else {
        next();
      }
    })
  } else {
    res.status(403).send("please add token with header");
  }
}

router.post("/register",createUser);
router.post("/login",LogUser);
router.post("/add",verifyToken, addToLikedMovies);
router.get("/liked/:email",verifyToken, getLikedMovies);
router.put("/remove",verifyToken, removeFromLikedMovies);

module.exports = router;




