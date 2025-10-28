import dbConnect from "@/lib/database";
import Product from "@/models/product";
import Link from "next/link";

export async function getStaticProps() {
  await dbConnect();
  const products = await Product.find({}).lean();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 3600, 
  };
}

export default function Home({ products }) {
  return (
    <>
      <style jsx>{`
      *{
        box-sizing: border-box;
        over-scroll-behavior: smooth;
        }
        .container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 60px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        .badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 25px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }
        
        .title {
          font-size: 56px;
          font-weight: 900;
          color: white;
          margin-bottom: 15px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out backwards;
        }
        
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s;
        }
        
        .card:hover::before {
          left: 100%;
        }
        
        .card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .card-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          transition: transform 0.3s;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .card:hover .card-icon {
          transform: rotate(10deg) scale(1.1);
        }
        
        .card-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
          line-height: 1.3;
          min-height: 60px;
        }
        
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 20px;
          border-top: 2px solid #f0f0f0;
          margin-top: 20px;
        }
        
        .price-label {
          font-size: 12px;
          color: #718096;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .price {
          font-size: 36px;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .view-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #667eea;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s;
        }
        
        .card:hover .view-btn {
          gap: 15px;
          color: #764ba2;
        }
        
        .arrow {
          transition: transform 0.3s;
        }
        
        .card:hover .arrow {
          transform: translateX(5px);
        }
        
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          animation: fadeIn 0.8s ease-out;
        }
        
        .empty-box {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          display: inline-block;
        }
        
        .empty-icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
        }
        
        .empty-text {
          font-size: 24px;
          color: #4a5568;
          font-weight: 600;
        }
        
        .empty-subtext {
          font-size: 16px;
          color: #a0aec0;
          margin-top: 10px;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 36px;
          }
          .grid {
            grid-template-columns: 1fr;
          }
        }

        .rec-btn {
  display: inline-block;
  margin-top: 25px;
  padding: 12px 22px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: white;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.rec-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: white;
  transform: translateY(-2px);
}

      `}</style>

      <div className="container">
       <div className="header">
  <div className="badge">✨ New Arrivals</div>
  <h1 className="title">Product Catalog</h1>
  <p className="subtitle">
    Discover our handpicked collection of premium products
  </p>

  <Link href="/recommendations" className="rec-btn">
    View Recommendations →
  </Link>
</div>


        {products.length > 0 ? (
          <div className="grid">
            {products.map((p, index) => (
              <Link 
                key={p._id} 
                href={`/products/${p.slug}`}
                style={{ 
                  textDecoration: 'none',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="card">
                  <div className="card-icon">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  
                  <h2 className="card-title">{p.name}</h2>
                  
                  <div className="card-footer">
                    <div>
                      <div className="price-label">Price</div>
                      <div className="price">${p.price}</div>
                    </div>

                    
                    
                    <div className="view-btn">
                      <span>View</span>
                      <span className="arrow">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-box">
              <div className="empty-icon">📦</div>
              <p className="empty-text">No products available yet</p>
              <p className="empty-subtext">Check back soon for new items!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}