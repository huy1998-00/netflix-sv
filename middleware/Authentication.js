const Users = require("../model/userToken");

module.exports = () => {
  return (req, res, next) => {
    const reqToken = req.query.token;
    console.log(reqToken);

    const userList = Users.all();

    const ExitsUser = userList.find((u) => u.token === reqToken);

    if (ExitsUser) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  };
};
