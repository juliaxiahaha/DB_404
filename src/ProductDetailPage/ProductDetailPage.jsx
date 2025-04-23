// src/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';

export const ProductDetailPage = ({ className = "", ...props }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [productRes, supplierRes, reviewsRes] = await Promise.all([
          fetch(`http://localhost:3001/api/products/${id}`),
          fetch(`http://localhost:3001/api/suppliers/fromProduct/${id}`),
          fetch(`http://localhost:3001/api/productReviews/byProduct/${id}`)
        ]);

        if (!productRes.ok || !supplierRes.ok || !reviewsRes.ok) throw new Error('Request failed');

        setProduct(await productRes.json());
        setSupplier(await supplierRes.json());
        setReviews(await reviewsRes.json());
      } catch (err) {
        console.error(err);
        setError('Failed to load product‑page resources');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="product-detail-page">Loading…</div>;
  if (error)   return <div className="product-detail-page">{error}</div>;
  if (!product || !supplier) return <div className="product-detail-page">No data found</div>;

  const money      = n => `$${Number(n).toFixed(2)}`;
  const formatDate = d => new Date(d).toLocaleDateString();

  const reviewColumns = [
    { key: 'Review_ID',  name: 'ID',       width: 60  },
    { key: 'rating',     name: 'Rating',   width: 80  },
    { key: 'comment',    name: 'Comment',  resizable: true,
      formatter: ({ row }) => <span title={row.comment}>{row.comment}</span> },
    { key: 'review_date',name: 'Date',     width: 180,
      formatter: ({ row }) => formatDate(row.review_date) },
    { key: 'Customer_ID',name: 'Customer_ID', width: 100 }
  ];

  return (
      <div className={`product-detail-page ${className}`} {...props}>
        <div className="title">Supplier Information</div>
        <div className="title2">Product Information</div>

        {/* Product metrics */}
        <div className="data-metrics">
          <div className="container">
            <div className="container2"><div className="title3">Sales Performance</div></div>
          </div>
          <div className="list">
            <div className="row">
              <div className="metric" style={{ flex: 'auto', minWidth: '200px' }}>
                <div className="title4">Product Name</div>
                <div className="data">{product.name}</div>
              </div>

              <div className="metric"><div className="title4">Retail price</div><div className="data">{money(product.retail_price)}</div></div>
              <div className="metric"><div className="title4">Purchasing price</div><div className="data">{money(product.purchasing_price)}</div></div>
            </div>
          </div>
          <img className="vector-200" src="vector-2000.svg" />
        </div>

        {/* Decorative line */}
        <img className="section" src="section0.svg" />

        {/* Product / Supplier summary */}
        <div className="title7">Product name: {product.name}<br /><br />Category: {product.category}<br /><br /></div>
        <div className="title8">Overall rating: {Number(product.ratings).toFixed(1)}/5.0</div>
        <div className="title6">Supplier Name: {supplier.name}<br /><br />Phone: {supplier.phone}<br /><br />Email: {supplier.email}</div>

        {/* Customer Reviews heading (absolute in CSS) remains untouched */}
        <div className="title14">Customer Reviews</div>

        {/* DataGrid placed directly beneath the heading */}
        <div style={{ position: 'absolute', left: '52px', top: '670px', width: '90%' }}>
          <DataGrid columns={reviewColumns} rows={reviews} style={{ height: 400 }} />
        </div>
      </div>
  );
};
