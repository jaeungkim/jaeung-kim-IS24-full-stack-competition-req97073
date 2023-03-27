const productsController = require("../controllers/products.controller");

module.exports = (app) => {
  // Set headers for CORS and caching
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

  // Route to add a product
  app.post("/api/products/addProduct", productsController.addProduct);

  // Route to update a product by ID
  app.put("/api/products/:productId", productsController.updateProduct);

  // Route to get all products by Scrum Master name
  app.get(
    "/api/products/scrumMaster/:name",
    productsController.getProductsByScrumMaster
  );

  // Route to search products by developer name
  app.get(
    "/api/products/developer/:developerName",
    productsController.searchProductsByDeveloper
  );
};
