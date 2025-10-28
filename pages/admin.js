import { useState } from "react";

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    inventory: "",
  });
  const [adminKey, setAdminKey] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    
    setIsLoading(false);
    setMessage(res.ok ? "✅ Product Added!" : data.message || "❌ Failed");
    
    if (res.ok) {
      setForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        category: "",
        inventory: "",
      });
    }
  }

  const fieldLabels = {
    name: "Product Name",
    slug: "URL Slug",
    description: "Description",
    price: "Price ($)",
    category: "Category",
    inventory: "Inventory Count"
  };

  const fieldIcons = {
    name: "🏷️",
    slug: "🔗",
    description: "📝",
    price: "💰",
    category: "📂",
    inventory: "📦"
  };

  return (
    <>
      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }
        
        .background-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: 
            linear-gradient(30deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b),
            linear-gradient(150deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b),
            linear-gradient(30deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b),
            linear-gradient(150deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b);
          background-size: 80px 140px;
          background-position: 0 0, 0 0, 40px 70px, 40px 70px;
        }
        
        .content-wrapper {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.2);
          border: 2px solid rgba(239, 68, 68, 0.3);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 25px;
          color: #fca5a5;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }
        
        .header-title {
          font-size: 48px;
          font-weight: 900;
          color: white;
          margin-bottom: 10px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        
        .header-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .form-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: fadeInUp 0.8s ease-out 0.2s backwards;
        }
        
        .form-group {
          margin-bottom: 25px;
          animation: slideInLeft 0.6s ease-out backwards;
        }
        
        .form-group:nth-child(1) { animation-delay: 0.3s; }
        .form-group:nth-child(2) { animation-delay: 0.35s; }
        .form-group:nth-child(3) { animation-delay: 0.4s; }
        .form-group:nth-child(4) { animation-delay: 0.45s; }
        .form-group:nth-child(5) { animation-delay: 0.5s; }
        .form-group:nth-child(6) { animation-delay: 0.55s; }
        
        .input-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .input-icon {
          font-size: 18px;
        }
        
        .input-field {
          width: 100%;
          padding: 14px 18px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          transition: all 0.3s;
          background: white;
          color: #1e293b;
          font-family: inherit;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }
        
        .input-field::placeholder {
          color: #94a3b8;
        }
        
        textarea.input-field {
          min-height: 100px;
          resize: vertical;
          font-family: inherit;
        }
        
        .admin-key-section {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 2px solid #fca5a5;
          border-radius: 16px;
          padding: 25px;
          margin-top: 30px;
          margin-bottom: 30px;
          animation: slideInLeft 0.6s ease-out 0.6s backwards;
        }
        
        .admin-key-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 700;
          color: #991b1b;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .submit-button {
          width: 100%;
          padding: 16px;
          font-size: 18px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
          animation: slideInLeft 0.6s ease-out 0.65s backwards;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
        }
        
        .submit-button:active:not(:disabled) {
          transform: translateY(-1px);
        }
        
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 10px;
        }
        
        .message-box {
          margin-top: 25px;
          padding: 16px 20px;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          animation: slideInUp 0.4s ease-out;
        }
        
        .message-success {
          background: #d1fae5;
          color: #065f46;
          border: 2px solid #34d399;
        }
        
        .message-error {
          background: #fee2e2;
          color: #991b1b;
          border: 2px solid #f87171;
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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .admin-container {
            padding: 30px 15px;
          }
          
          .header-title {
            font-size: 36px;
          }
          
          .form-card {
            padding: 25px;
          }
        }
      `}</style>

      <div className="admin-container">
        <div className="background-pattern"></div>
        
        <div className="content-wrapper">
          <div className="header">
            <div className="security-badge">
              <span>🔒</span>
              <span>Secure Admin Area</span>
            </div>
            <h1 className="header-title">
              <span>🔐</span>
              <span>Admin Panel</span>
            </h1>
            <p className="header-subtitle">
              Add and manage products in your inventory
            </p>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
              {Object.keys(form).map((key) => (
                <div key={key} className="form-group">
                  <label className="input-label">
                    <span className="input-icon">{fieldIcons[key]}</span>
                    <span>{fieldLabels[key]}</span>
                  </label>
                  {key === 'description' ? (
                    <textarea
                      className="input-field"
                      placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      required
                    />
                  ) : (
                    <input
                      className="input-field"
                      type={key === 'price' || key === 'inventory' ? 'number' : 'text'}
                      placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      required
                      step={key === 'price' ? '0.01' : undefined}
                      min={key === 'price' || key === 'inventory' ? '0' : undefined}
                    />
                  )}
                </div>
              ))}

              <div className="admin-key-section">
                <div className="admin-key-header">
                  <span>🔑</span>
                  <span>Authentication Required</span>
                </div>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter admin key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Adding Product...
                  </>
                ) : (
                  '✨ Add Product'
                )}
              </button>
            </form>

            {message && (
              <div className={`message-box ${message.includes('✅') ? 'message-success' : 'message-error'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}