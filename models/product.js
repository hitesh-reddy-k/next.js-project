import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  description: String,
  price: Number,
  category: String,
  inventory: Number,
  lastUpdated: Date,
});

console.log("ProductSchema:", ProductSchema);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
