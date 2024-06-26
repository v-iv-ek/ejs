const fs = require("fs");
const path = require("path");
const Product = require("./product");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id == id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updateCart = { ...JSON.parse(fileContent) };
      const product = updateCart.products.find((prod) => prod.id == id);
      const productQty = product.qty;
      updateCart.products = updateCart.products.filter(
        (prod) => prod.id !== id
      );
      updateCart.totalPrice = updateCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updateCart), (err) => {
        console.log(err);
      });
    });
  }
};
