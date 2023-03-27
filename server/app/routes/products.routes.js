const productsController = require("../controllers/products.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Cache-Control", "no-store,no-cache,must-revalidate");
    next();
  });

  // Route to get all products
  app.get("/api/products", productsController.getAllProducts);
};
