const express = require("express");
const router = express.Router();
const config = require("config");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
router.post("/api/auth", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not found with provided email");
  const isValidPassword = await bcryptjs.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) return res.status(400).send("Invalid Password");
  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
