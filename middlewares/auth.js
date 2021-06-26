const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");
module.exports = async function (req, res, next) {
  console.log("auth middleware called");
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("User Not Logged In");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    let user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    require("winston").error("Invalid Token Attempt from " + ip);
    return res
      .status(401)
      .send("Token is Modified. You Are being logged as Amature Hacker.");
  }
};
