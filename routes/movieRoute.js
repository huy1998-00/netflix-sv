const express = require("express");

const router = express.Router();

const MovieController = require("../controllers/movieControllers");

const Auth = require("../middleware/Authentication");

//get trending

router.get("/api/movies/trending", Auth(), MovieController.getTrending);

// get top rating

router.get("/api/movies/top-rate", Auth(), MovieController.getTopRating);

// get discover

router.get("/api/movies/discover", Auth(), MovieController.getbyGenre);

//get video

router.post("/api/movies/video", Auth(), MovieController.getVideobyID);

// get search video

router.post(
  "/api/movies/search",
  Auth(),
  MovieController.searchMoviebyKeyworld
);

module.exports = router;
