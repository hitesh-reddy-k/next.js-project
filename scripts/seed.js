import mongoose from "mongoose";
import Product from "../models/product.js";

const MONGODB_URI = "mongodb+srv://hiteshreddyai_db_user:b1HDuZW9mMFcZeSC@cluster0.ardtwm2.mongodb.net/?appName=Cluster0";

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  await Product.deleteMany({});

  await Product.insertMany([
    {
      name: "Blue T-Shirt",
      slug: "blue-tshirt",
      description: "Comfortable cotton t-shirt",
      price: 19.99,
      category: "clothing",
      inventory: 24,
      lastUpdated: new Date(),
    },
    {
      name: "Red Mug",
      slug: "red-mug",
      description: "Ceramic coffee mug 350ml",
      price: 9.5,
      category: "home",
      inventory: 12,
      lastUpdated: new Date(),
    },
    {
      name: "Wireless Mouse",
      slug: "wireless-mouse",
      description: "Ergonomic 2.4GHz wireless mouse",
      price: 15.0,
      category: "electronics",
      inventory: 8,
      lastUpdated: new Date(),
    },
  ]);

  console.log("Sample data inserted");
  mongoose.connection.close();
};

seed();
