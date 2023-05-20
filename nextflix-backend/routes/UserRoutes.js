const router = require("express").Router();

const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  createUser,
  LogUser,
} = require("../controllers/UserController");


router.post("/register",createUser);
router.post("/login",LogUser);
router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/remove", removeFromLikedMovies);

module.exports = router;




