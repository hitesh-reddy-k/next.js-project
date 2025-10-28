import dbConnect from "@/lib/database";
import Product from "@/models/product";

export async function getServerSideProps() {
  await dbConnect();
  const products = await Product.find({}).lean();
  const lowStock = products.filter((p) => p.inventory <= 5).length;
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      total: products.length,
      lowStock,
    },
  };
}

export default function Dashboard({ products, total, lowStock }) {
  return (
    <>
      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%);
          padding: 40px 20px;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        .header-title {
          font-size: 48px;
          font-weight: 900;
          color: white;
          margin-bottom: 10px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        
        .header-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out backwards;
        }
        
        .stat-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        
        .stat-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 20px;
          transition: transform 0.3s;
        }
        
        .stat-card:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
        }
        
        .stat-icon.blue {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }
        
        .stat-icon.red {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
        }
        
        .stat-label {
          font-size: 14px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .stat-value {
          font-size: 42px;
          font-weight: 900;
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-value.warning {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .table-container {
          background: white;
          border-radius: 20px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          animation: fadeInUp 0.6s ease-out 0.3s backwards;
        }
        
        .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        
        .table-title {
          font-size: 28px;
          font-weight: 800;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .badge {
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .table-wrapper {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        thead {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
        }
        
        th {
          padding: 18px 20px;
          text-align: left;
          font-size: 14px;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        tbody tr {
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.2s;
        }
        
        tbody tr:hover {
          background: #f8fafc;
          transform: scale(1.01);
        }
        
        tbody tr:last-child {
          border-bottom: none;
        }
        
        td {
          padding: 18px 20px;
          font-size: 15px;
          color: #475569;
        }
        
        .product-name {
          font-weight: 600;
          color: #1e293b;
        }
        
        .inventory-badge {
          display: inline-block;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 14px;
        }
        
        .inventory-high {
          background: #d1fae5;
          color: #065f46;
        }
        
        .inventory-medium {
          background: #fef3c7;
          color: #92400e;
        }
        
        .inventory-low {
          background: #fee2e2;
          color: #991b1b;
          animation: pulse 2s infinite;
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @media (max-width: 768px) {
          .header-title {
            font-size: 32px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .table-container {
            padding: 20px;
          }
          
          .table-title {
            font-size: 22px;
          }
          
          th, td {
            padding: 12px 15px;
            font-size: 14px;
          }
        }
      `}</style>

      <div className="dashboard">
        <div className="container">
          <div className="header">
            <h1 className="header-title">
              <span>📊</span>
              <span>Inventory Dashboard</span>
            </h1>
            <p className="header-subtitle">
              Real-time product inventory management
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">📦</div>
              <div className="stat-label">Total Products</div>
              <div className="stat-value">{total}</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon red">⚠️</div>
              <div className="stat-label">Low Stock Alert</div>
              <div className="stat-value warning">{lowStock}</div>
            </div>
          </div>

          
          <div className="table-container">
            <div className="table-header">
              <h2 className="table-title">
                📋 Product Inventory
              </h2>
              <div className="badge">{products.length} Items</div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Inventory Level</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const inventoryClass = 
                      p.inventory <= 5 ? 'inventory-low' :
                      p.inventory <= 15 ? 'inventory-medium' :
                      'inventory-high';
                    
                    const status = 
                      p.inventory <= 5 ? 'Low Stock' :
                      p.inventory <= 15 ? 'Medium' :
                      'In Stock';
                      
                    return (
                      <tr key={p._id}>
                        <td className="product-name">{p.name}</td>
                        <td>
                          <span className={`inventory-badge ${inventoryClass}`}>
                            {p.inventory} units
                          </span>
                        </td>
                        <td>{status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}