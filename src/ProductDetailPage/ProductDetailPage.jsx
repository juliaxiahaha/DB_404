// src/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";

export const ProductDetailPage = ({ className = "", ...props }) => {
  const { id } = useParams();                 // /products/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    async function load() {
      try {
        // console.log(`http://localhost:3001/api/products/${id}`)
        const res = await fetch(
            `http://localhost:3001/api/products/${id}`
        );
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="product-detail-page">Loading…</div>;
  if (error)   return <div className="product-detail-page">{error}</div>;
  if (!product)
    return <div className="product-detail-page">No product found</div>;

  /* helpers */
  const money = n => `$${Number(n).toFixed(2)}`;

  return (
      <div className={`product-detail-page ${className}`} {...props}>
        <div className="title">Supplier Information</div>
        <div className="title2">Product Information</div>

        {/* metrics block */}
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

          {/* keep the static chart / graph section untouched */}
          <div className="container3">
            <div className="container4">
              <div className="title5">Monthly Sales</div>
              <div className="y-axis">Sales Value</div>
              <img className="graph" src="graph0.svg" />
              <div className="x-axis">Months</div>
            </div>
          </div>
          <img className="vector-200" src="vector-2000.svg" />
        </div>

        {/* decorative section kept as-is */}
        <img className="section" src="section0.svg" />

        {/* left-column product info */}
        <div className="title7">
          Product name: {product.name}
          <br />
          <br />
          Category: {product.category}
          <br />
          <br />
        </div>
        <div className="title8">
          Overall rating: {Number(product.ratings).toFixed(1)}/5.0
        </div>

        {/* right-column supplier info */}
        <div className="title6">
          Supplier ID: {product.Supplier_ID}
          <br />
          <br />
          Supplier Logo:
          <br />
        </div>
        <img className="image-33" src="image-330.png" />

        {/* every other decorative / static block below is left unchanged */}
        {/* … existing JSX continues exactly as before … */}
      </div>
  );
};
