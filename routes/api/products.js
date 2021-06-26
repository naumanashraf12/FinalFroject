const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../../middlewares/auth");
const Product = require("../../models/product");
const multer = require("multer");
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, mongoose.Types.ObjectId() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.get("/api/products/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  return res.send(product);
});
router.get("/api/products", auth, async (req, res) => {
  let products = await Product.find();
  return res.send(products);
});
router.post("/api/products", upload.single("picture"), async (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.picture = req.file.filename;
  await product.save();
  return res.send(product);
});
router.delete("/api/products:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);

  return res.send(product);
});
router.put("/api/products:id", upload.single("picture"), async (req, res) => {
  let product = await Product.findById(req.params.id);

  product.name = req.body.name;
  product.price = req.body.price;
  product.picture = req.file.filename;
  await product.save();
  return res.send(product);
});

module.exports = router;
