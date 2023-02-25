const MovieList = require("../model/MovieList");
const GenreList = require("../model/genreList");
const VideoList = require("../model/videoList");
const PaginatedResult = require("../ultils/Paginated");

exports.getTrending = (req, res, next) => {
  const movies = MovieList.all();

  movies.sort((a, b) => {
    return b.popularity - a.popularity;
  });

  const result = PaginatedResult(movies, 1, 20);

  res.status(200).json(result);
};

exports.getTopRating = (req, res, next) => {
  const movies = MovieList.all();

  movies.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });

  const result = PaginatedResult(movies, 1, 20);

  res.status(200).json(result);
};

exports.getbyGenre = (req, res, next) => {
  const searchGenreID = parseInt(req.query.genre);
  const genreList = GenreList.all();

  const resultGenre = genreList.find((g) => g.id === searchGenreID);

  if (!searchGenreID) {
    res.status(400).send("Not found gerne parram");
    return;
  } else if (!resultGenre) {
    res.status(400).send("Not found that gerne id");
    return;
  } else {
    const movies = MovieList.all();
    // console.log(movies.slice(1, 10));
    const newMovieList = movies.filter((m) =>
      m.genre_ids.includes(searchGenreID)
    );

    const results = PaginatedResult(newMovieList, 1, 20);
    results.genre_name = resultGenre.name;

    res.status(200).json(results);
  }
};

exports.getVideobyID = (req, res, next) => {
  const videoID = req.body.film_id;
  //list video của tất cả các ID
  if (!videoID) {
    res.status(400).send("Not found film_id parram");
    return;
  }
  const videos = VideoList.all();
  // list video của ID cần tìm
  const result = videos.find((v) => v.id === videoID);

  if (!result) {
    res.status(400).send("Not found video");
    return;
  } else {
    // lọc ra những video phù hợp
    const resultVideo = result.videos.filter(
      (v) =>
        v.official === true &&
        v.site === "YouTube" &&
        (v.type === "Trailer" || v.type === "Teaser")
    );

    resultVideo.sort((a, b) => {
      return b.published_at - a.published_at;
    });

    res.json(resultVideo[0]);
    res.status(200);
  }
};

exports.searchMoviebyKeyworld = (req, res, next) => {
  const keyword = req.body.keyword.toLowerCase();

  const options = req.body.options;

  const genre = req.body.options.genre;
  const type = req.body.options.type.toLowerCase();
  const language = req.body.options.type;

  if (!keyword) {
    res.status(400).send("Not found keyword parram");
    return;
  }

  // console.log(keyword);

  const movies = MovieList.all();

  const result1 = movies.filter((m) =>
    m.overview.toLowerCase().includes(keyword)
  );

  const movieshastitle = movies.filter((m) => m.title);

  const result2 = movieshastitle.filter((m) =>
    m.title.toLowerCase().includes(keyword)
  );

  const result = result1.concat(result2);

  console.log(result);

  if (result.length < 1) {
    res.status(400).send("Not found any matching movie");
    return;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const unqResult = result.filter(onlyUnique);

  if (!options.change) {
    const finalResult = PaginatedResult(unqResult);

    res.status(200).json(finalResult);
  } else {
    const uniresultsWithoptions = unqResult.filter(
      (m) =>
        m.genre_ids.includes(genre) && m.media_type.toLowerCase().includes(type)
    );

    const finalResult2 = PaginatedResult(uniresultsWithoptions);

    res.status(200).json(finalResult2);
  }
};
