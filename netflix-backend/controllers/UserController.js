const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET;
const signToken = (userId) => jwt.sign({ userId }, jwtKey);

module.exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(200).json({
        status: "error",
        message: "all fields are required",
      });
    }

    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      res.status(400).json({
        status: "error",
        message: "Email is already in use ,Please Login",
      });
    } else {
      const new_user = await User.create({ email, password, likedMovies: [] });
      // result = result.toObject();

      const token = signToken(new_user._id);
      console.log(token, "this is token");
      // res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ new_user, token });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.LogUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "error",
        message: "both email and password are required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "error",
        message: "Email or password is incorrect",
      });
    }
    // res.setHeader('Content-Type', 'application/json');

    const token = signToken(user._id);

    console.log(user);

    res.status(200).json({
      user,
      status: "sucess",
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const { likedMovies } = user;
      const moviesAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!moviesAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $push: { likedMovies: data },
          },
          {
            new: true,
          },
        );
      } else {
        // res.setHeader('Content-Type', 'application/json');
        return res.json({ msg: "Movie already added to likedMovies" });
      }
    }
  } catch (error) {
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    console.log("from backend=> ", user.likedMovies);
    if (user) {
      // res.setHeader('Content-Type', 'application/json');
      res.json({ msg: "success", movies: user.likedMovies });
    } else {
      res.json({ msg: "no user found with this email" });
    }
  } catch (error) {
    console.log(error, "Integernal server error");
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    console.log(movieId);
    const user = await User.findOne({ email });
    if (user) {
      let movies = user.likedMovies;
      // const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieId) {
        res.status(400).json({ msg: "Movie not found" });
      } else {
        movies = await User.findByIdAndUpdate(
          user._id,
          {
            $pull: { likedMovies: { id: movieId } },
          },
          { new: true },
        );
        console.log(movies.likedMovies);
        return res.json({ msg: "deleted", movies: movies.likedMovies });
      }
    }
  } catch (error) {
    return res.json({ msg: "Error deleting movie from backend" });
  }
};
