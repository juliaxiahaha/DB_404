// src/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';
import ArrowDown from "./assets/ic-arrow-drop-down0.svg";

export const ProductDetailPage = ({ className = "", ...props }) => {
  const { id } = useParams();
  const [product, setProduct]   = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const [sortCol, setSortCol]   = useState(null);
  const [sortDir, setSortDir]   = useState("ASC");

  const money      = (n) => `$${Number(n).toFixed(2)}`;
  const formatDate = (d) => new Date(d).toLocaleDateString();

  const fetchSorted = async (col, dir) => {
    try {
      const url = `http://localhost:3001/api/sorter?tbl=ProductReview&col=${col}&op=${dir}`;
      const r = await fetch(url);
      if (!r.ok) throw new Error("sort fetch failed");
      const data = await r.json();
      const filtered = data.filter(entry => String(entry.Product_ID) === String(id));
      setReviews(filtered);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSort = (col) => {
    const dir = sortCol === col && sortDir === "ASC" ? "DESC" : "ASC";
    setSortCol(col);
    setSortDir(dir);
    fetchSorted(col, dir);
  };

  const header = (label, colKey) => (
      <span
          style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}
          onClick={() => toggleSort(colKey)}
      >
      {label}
        <img
            src={ArrowDown}
            alt="sort"
            style={{ width: 12, transform: sortCol === colKey && sortDir === "DESC" ? "rotate(180deg)" : "none" }}
        />
    </span>
  );

  useEffect(() => {
    (async () => {
      try {
        const [pRes, sRes, rRes, dRes] = await Promise.all([
          fetch(`http://localhost:3001/api/products/${id}`),
          fetch(`http://localhost:3001/api/suppliers/fromProduct/${id}`),
          fetch(`http://localhost:3001/api/productReviews/byProduct/${id}`),
          fetch(`http://localhost:3001/api/discounts/fromProduct/${id}`)
        ]);

        if ([pRes, sRes, rRes].some((r) => !r.ok)) throw new Error("Request failed");

        setProduct(await pRes.json());
        setSupplier(await sRes.json());
        setReviews(await rRes.json());

        if (dRes.ok) {
          const d = await dRes.json();
          setDiscount(d);
        } else {
          console.warn("No discount data found.");
          setDiscount(null);
        }
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

  const reviewColumns = [
    { key: "Review_ID",   name: header("ID", "Review_ID"), width: 60 },
    { key: "rating",      name: header("Rating", "rating"), width: 80 },
    {
      key: "comment",
      name: header("Comment", "comment"),
      resizable: true,
      formatter: ({ row }) => <span title={row.comment}>{row.comment}</span>
    },
    {
      key: "review_date",
      name: header("Date", "review_date"),
      width: 180,
      formatter: ({ row }) => formatDate(row.review_date)
    },
    { key: "Customer_ID", name: header("Customer", "Customer_ID"), width: 100 }
  ];

  return (
      <div
          className={`product-detail-page ${className}`}
          style={{ display: "flex", flexDirection: "column", gap: 64, padding: 40 }}
          {...props}
      >
        {/* PRODUCT & SUPPLIER */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
          <div style={{ flex: "1 1 280px" }}>
            <h2>Product Information</h2>
            <div className="metric"><div className="title4">Name</div><div className="data">{product.name}</div></div>
            <div className="metric"><div className="title4">Category</div><div className="data">{product.category}</div></div>
            <div className="metric"><div className="title4">Overall rating</div><div className="data">{Number(product.ratings).toFixed(1)}/5.0</div></div>
            <div className="metric"><div className="title4">Retail price</div><div className="data">{money(product.retail_price)}</div></div>
            <div className="metric"><div className="title4">Purchasing price</div><div className="data">{money(product.purchasing_price)}</div></div>
          </div>
          <div style={{ flex: "1 1 280px" }}>
            <h2>Supplier Information</h2>
            <div className="metric"><div className="title4">Name</div><div className="data">{supplier.name}</div></div>
            <div className="metric"><div className="title4">Phone</div><div className="data">{supplier.phone}</div></div>
            <div className="metric"><div className="title4">Email</div><div className="data">{supplier.email}</div></div>
          </div>
        </section>

        {/* DISCOUNT */}
        <section>
          <h2>Current Discount</h2>
          {discount ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                <div className="metric"><div className="title4">Discount_ID</div><div className="data">{discount.Discount_ID}</div></div>
                <div className="metric"><div className="title4">discount_type</div><div className="data">{discount.discount_type}</div></div>
                <div className="metric"><div className="title4">discount_value</div><div className="data">{discount.discount_value + "%"}</div></div>
                <div className="metric"><div className="title4">start_date</div><div className="data">{formatDate(discount.start_date)}</div></div>
                <div className="metric"><div className="title4">end_date</div><div className="data">{formatDate(discount.end_date)}</div></div>
              </div>
          ) : (
              <p style={{ paddingLeft: 8, fontStyle: "italic", color: "gray" }}>No active discount found for this product.</p>
          )}
        </section>

        {/* CUSTOMER REVIEWS WITH SORT */}
        <section>
          <h2>Customer Reviews</h2>
          <DataGrid columns={reviewColumns} rows={reviews} style={{ height: 400 }} />
        </section>
      </div>
  );
};