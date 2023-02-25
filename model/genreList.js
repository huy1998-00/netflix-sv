const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const Genres = {
  all: function () {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  },
};

module.exports = Genres;
