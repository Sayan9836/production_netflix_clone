const User = require("../models/UserModel");
require('dotenv').config();
// const jwtKey = process.env.JWT_SECRET;
module.exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await User.create({ email, password, likedMovies: [] });
    delete result.password;
    result = result.toObject();

    // JWT.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    //   if (err) {
    //     res.send({ err: "error from backend" })
    //   }
    //   console.log(result);
    //   res.send({ result, token });
    // })
    res.setHeader('Content-Type', 'application/json');
    res.send(result);
                                                                                                             
  } catch (error) {
    console.log(error);
  }
}
                                                                                                            
module.exports.LogUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (email && password) {
      let user = await User.findOne({ email });
      console.log(user);
      if (user) {
        // JWT.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        //   if (err) {
        //     return res.status(500).send({ error: "Error signing JWT" });
        //   }
        //   res.setHeader('Content-Type', 'application/json');
        //   console.log(user);
        //   res.status(200).send({ user });
        // });
        res.setHeader('Content-Type', 'application/json');
        res.send({ user })
      } else {
        res.status(400).send({ error: "User not found" });
      }
    } else {
      res.status(400).send({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
}








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
            likedMovies: [...user.likedMovies, data],
          },
          {
            new: true,

          }
        );
      } else {
        res.setHeader('Content-Type', 'application/json');
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
    if (user) {
      res.setHeader('Content-Type', 'application/json');
      res.json({ msg: "success", movies: user.likedMovies });
    }else{
      res.json({msg:"no user found with this email"})
    }
  } catch (error) {
    console.log(error, "database problem");
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found" });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      res.setHeader('Content-Type', 'application/json');
      return res.json({ msg: "deleted", movies });
    }
  } catch (error) {
    return res.json({ msg: "Error deleting movie from backend" });
  }
};
