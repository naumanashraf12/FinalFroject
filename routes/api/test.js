var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/api/test", function (req, res, next) {
  res.send("Usman Akram");
});

module.exports = router;
