// Import dependencies
const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Product = require("./app/models/product.model");
const { faker } = require("@faker-js/faker");

// Configuration
const port = 3000;
const corsOptions = { credentials: true, origin: ["http://localhost:3030"] };
const connectionString = "mongodb://localhost:27017/jaeungkim-fullstack-db";
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Create and configure a new Express app instance
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the MongoDB database and seed if necessary
async function connectToDatabase() {
  try {
    await db.mongoose.connect(connectionString, mongoOptions);
    console.log("Successfully connected to MongoDB");

    const count = await Product.countDocuments();
    if (count === 0) {
      await seedProducts();
    }
  } catch (error) {
    console.error("Connection error", error);
    process.exit(1);
  }
}

async function seedProducts() {
  const numProducts = 40;
  const products = Array.from({ length: numProducts }, (_, i) => ({
    productId: i + 1,
    productName: faker.commerce.productName(),
    productOwnerName: faker.name.fullName(),
    developers: [
      faker.name.fullName(),
      faker.name.fullName(),
      faker.name.fullName(),
    ],
    scrumMasterName: faker.name.fullName(),
    startDate: faker.date.past(),
    methodology: faker.helpers.arrayElement(["Agile", "Waterfall"]),
  }));

  await Product.insertMany(products);
  console.log("Added new products");
}

connectToDatabase();

// Define a route to display a welcome message
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to jaekim's is24-fullstack competition application.",
  });
});

// Include the routes for products management
require("./app/routes/products.routes")(app);

// Start listening for incoming requests on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
