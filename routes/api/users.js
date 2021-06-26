const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const User = require("../../models/user");
router.post("/api/users", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email Already Registered");
  let userObject = req.body;
  const salt = await bcryptjs.genSalt(10);
  userObject.password = await bcryptjs.hash(userObject.password, salt);

  user = new User(userObject);
  await user.save();
  res.send(user);
});

module.exports = router;
