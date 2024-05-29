const Product = require("../models/product");
const Cart = require("../models/cart");
const { where } = require("sequelize");

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
    });
  })
  .catch(err=>{
    console.log(err)
  })
};
exports.getProduct = (req, res, next) => {
  const proId = req.params.proId;  
  Product.findOne({where:{id:proId}})
  .then(product=>{
    res.render("shop/product-detail",{
      product:product,
      pageTitle:product.title,
      path:"/products"
    })
  })
  .catch(err=>{
    console.log(err)
  })
 
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  })
  .catch(err=>{
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      product:products
    });
  })
  .catch(err=>{
    console.log(err);
  })
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart"); 
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
