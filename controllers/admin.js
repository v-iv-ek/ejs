const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>{
    console.log(err)
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
     return res.redirect('/');
  }
  const proId=req.params.productId;
  Product.findById(proId,product=>{
     if(!product){
      res.redirect("/")
     }
     res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
    });
  })
};
exports.postEditProduct = (req, res, next) => {
   const u_id=req.body.productID
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const updatedProduct = new Product(u_id,title, imageUrl, description, price);
  updatedProduct.save();
   res.redirect("/admin/products")

}
exports.postDeleteProduct=(req,res,next)=>{
  const d_id=req.body.productID;
  Product.deleteById(d_id)
    res.redirect("/admin/products")
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{    
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err =>{
    console.log(err)
  })
 
    

};
