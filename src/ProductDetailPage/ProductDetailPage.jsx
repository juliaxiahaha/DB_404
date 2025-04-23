// src/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";

export const ProductDetailPage = ({ className = "", ...props }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [productRes, supplierRes] = await Promise.all([
          fetch(`http://localhost:3001/api/products/${id}`),
          fetch(`http://localhost:3001/api/suppliers/fromProduct/${id}`)
        ]);

        if (!productRes.ok || !supplierRes.ok) throw new Error("Request failed");

        const productData = await productRes.json();
        const supplierData = await supplierRes.json();

        setProduct(productData);
        setSupplier(supplierData);
      } catch (err) {
        console.error(err);
        setError("Failed to load product or supplier data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="product-detail-page">Loading…</div>;
  if (error)   return <div className="product-detail-page">{error}</div>;
  if (!product || !supplier)
    return <div className="product-detail-page">No product or supplier data found</div>;

  const money = n => `$${Number(n).toFixed(2)}`;

  return (
      <div className={`product-detail-page ${className}`} {...props}>
        <div className="title">Supplier Information</div>
        <div className="title2">Product Information</div>

        <div className="data-metrics">
          <div className="container">
            <div className="container2">
              <div className="title3">Sales Performance</div>
            </div>
          </div>

          <div className="list">
            <div className="row">
              <div className="metric">
                <div className="title4">Product Name</div>
                <div className="data">{product.name}</div>
              </div>
              <div className="metric">
                <div className="title4">Retail price</div>
                <div className="data">{money(product.retail_price)}</div>
              </div>
              <div className="metric">
                <div className="title4">Purchasing price</div>
                <div className="data">{money(product.purchasing_price)}</div>
              </div>
            </div>
          </div>

          <img className="vector-200" src="vector-2000.svg" />
        </div>

        <img className="section" src="section0.svg" />

        <div className="title7">
          Product name: {product.name}
          <br /><br />
          Category: {product.category}
          <br /><br />
        </div>
        <div className="title8">
          Overall rating: {Number(product.ratings).toFixed(1)}/5.0
        </div>

        <div className="title6">
          Supplier Name: {supplier.name}
          <br /><br />
          Phone: {supplier.phone}
          <br /><br />
          Email: {supplier.email}
        </div>

        {/* static blocks below remain unchanged */}
      </div>
  );
};