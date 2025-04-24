// src/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';

/**
 * Product detail page – rebuilt with elastic flex layout.
 * All major blocks flow naturally and resize responsively.
 */
export const ProductDetailPage = ({ className = "", ...props }) => {
  const { id } = useParams();
  const [product, setProduct]   = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  /** Helpers */
  const money      = (n) => `$${Number(n).toFixed(2)}`;
  const formatDate = (d) => new Date(d).toLocaleDateString();

  /** Load all resources in parallel */
  useEffect(() => {
    (async () => {
      try {
        const [pRes, sRes, rRes, dRes] = await Promise.all([
          fetch(`http://localhost:3001/api/products/${id}`),
          fetch(`http://localhost:3001/api/suppliers/fromProduct/${id}`),
          fetch(`http://localhost:3001/api/productReviews/byProduct/${id}`),
          fetch(`http://localhost:3001/api/discounts/fromProduct/${id}`)
        ]);

        if ([pRes, sRes, rRes, dRes].some((r) => !r.ok)) throw new Error("Request failed");

        setProduct(await pRes.json());
        setSupplier(await sRes.json());
        setReviews(await rRes.json());
        setDiscount(await dRes.json());
      } catch (e) {
        console.error(e);
        setError("Failed to load product-page resources");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="product-detail-page">Loading…</div>;
  if (error)   return <div className="product-detail-page">{error}</div>;
  if (!product || !supplier) return <div className="product-detail-page">No data found</div>;

  /** Review grid columns */
  const reviewColumns = [
    { key: "Review_ID",   name: "ID", width: 60 },
    { key: "rating",      name: "Rating", width: 80 },
    {
      key: "comment",
      name: "Comment",
      resizable: true,
      formatter: ({ row }) => <span title={row.comment}>{row.comment}</span>
    },
    {
      key: "review_date",
      name: "Date",
      width: 180,
      formatter: ({ row }) => formatDate(row.review_date)
    },
    { key: "Customer_ID", name: "Customer", width: 100 }
  ];

  /** UI */
  return (
      <div
          className={`product-detail-page ${className}`}
          style={{ display: "flex", flexDirection: "column", gap: 64, padding: 40 }}
          {...props}
      >
        {/* ⇢ 1. TOP INFO SECTION – elastic row */}
        <section
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              justifyContent: "space-between"
            }}
        >
          {/* Product card */}
          <div style={{ flex: "1 1 280px", minWidth: 280 }}>
            <h2 style={{ marginBottom: 16 }}>Product Information</h2>
            <div className="metric"><div className="title4">Name</div><div className="data">{product.name}</div></div>
            <div className="metric"><div className="title4">Category</div><div className="data">{product.category}</div></div>
            <div className="metric"><div className="title4">Overall rating</div><div className="data">{Number(product.ratings).toFixed(1)}/5.0</div></div>
            <div className="metric"><div className="title4">Retail price</div><div className="data">{money(product.retail_price)}</div></div>
            <div className="metric"><div className="title4">Purchasing price</div><div className="data">{money(product.purchasing_price)}</div></div>
          </div>

          {/* Supplier card */}
          <div style={{ flex: "1 1 280px", minWidth: 280 }}>
            <h2 style={{ marginBottom: 16 }}>Supplier Information</h2>
            <div className="metric"><div className="title4">Name</div><div className="data">{supplier.name}</div></div>
            <div className="metric"><div className="title4">Phone</div><div className="data">{supplier.phone}</div></div>
            <div className="metric"><div className="title4">Email</div><div className="data">{supplier.email}</div></div>
          </div>
        </section>

        {/* ⇢ 3. DISCOUNT SECTION – elastic metric row */}
        {discount && (
            <section>
              <h2>Current Discount</h2>
              <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                    justifyContent: "space-between"
                  }}
              >
                <div className="metric" style={{ flex: "1 1 180px" }}>
                  <div className="title4">Discount_ID</div>
                  <div className="data">{discount.Discount_ID}</div>
                </div>
                <div className="metric" style={{ flex: "1 1 180px" }}>
                  <div className="title4">discount_type</div>
                  <div className="data">{discount.discount_type}</div>
                </div>
                <div className="metric" style={{ flex: "1 1 180px" }}>
                  <div className="title4">discount_value</div>
                  <div className="data">{money(discount.discount_value)}</div>
                </div>
                <div className="metric" style={{ flex: "1 1 180px" }}>
                  <div className="title4">start_date</div>
                  <div className="data">{formatDate(discount.start_date)}</div>
                </div>
                <div className="metric" style={{ flex: "1 1 180px" }}>
                  <div className="title4">end_date</div>
                  <div className="data">{formatDate(discount.end_date)}</div>
                </div>
              </div>
            </section>
        )}

        {/* ⇢ 4. CUSTOMER REVIEWS */}
        <section>
          <h2>Customer Reviews</h2>
          <DataGrid columns={reviewColumns} rows={reviews} style={{ height: 400 }} />
        </section>
      </div>
  );
};