const Product = require("../models/product");
module.exports = async function () {
  await Product.deleteMany({});
  let product = new Product({
    name: "Lenovo",
    price: 99,
    picture: "lenovo.jpg",
  });
  await product.save();
};
