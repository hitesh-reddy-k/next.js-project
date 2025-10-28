import dbConnect from "@/lib/database";
import Product from "@/models/product";

export default async function RecommendationsPage() {
  await dbConnect();
  const products = await Product.find({}).lean();

  const recommended = products
    .sort((a, b) => (b.price - a.price) || (a.inventory - b.inventory))
    .slice(0, 3);

  return (
    <html>
        <body>
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      padding: "40px 20px",
      display: "flex",
      justifyContent: "center"
    }}>
        
      <div style={{ width: "100%", maxWidth: "900px", color: "white", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "900", marginBottom: "10px" }}>
          🔥 Trending Picks
        </h1>
        <p style={{ fontSize: "16px", opacity: 0.8, marginBottom: "40px" }}>
          Server-rendered recommendations
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px"
        }}>
          {recommended.map((p) => (
            <div key={p._id} style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "30px",
              backdropFilter: "blur(12px)",
            }}>
              <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>{p.name}</h2>
              <p style={{ fontSize: "18px", opacity: 0.9 }}>${p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </body>
    </html>

  );
}
