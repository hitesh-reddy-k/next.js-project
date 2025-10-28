import dbConnect from "@/lib/database";
import Product from "@/models/product";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  console.log("Product ID:", id);

  if (req.method === "PUT") {
    const adminKey = req.headers["x-admin-key"];
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updated = await Product.findByIdAndUpdate(
      id,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );
    return res.status(200).json(updated);
  }

  res.setHeader("Allow", ["PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
