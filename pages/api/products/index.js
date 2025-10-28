import dbConnect from "@/lib/database";
import Product from "@/models/product";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const products = await Product.find({});
    console.log("Fetched products:", products);
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const adminKey = req.headers["x-admin-key"];
    console.log("Admin Key:", adminKey);
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const product = await Product.create({
      ...req.body,
      lastUpdated: new Date(),
    });

    console.log("Created product:", product);
    return res.status(201).json(product);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
