// src/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import "react-data-grid/lib/styles.css";
import { DataGrid } from "react-data-grid";
import ArrowDown from "./assets/ic-arrow-drop-down0.svg";

export const ProductDetailPage = ({ className = "", ...props }) => {
  const { id } = useParams();

  /* ────── STATE ────── */
  const [product, setProduct]   = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const [sortCol, setSortCol]   = useState(null);
  const [sortDir, setSortDir]   = useState("ASC");

  const [isEditing,  setIsEditing]  = useState(false);
  const [editFields, setEditFields] = useState({
    new_name: "",
    new_category: "",
    new_retail_price: "",
    new_purchasing_price: ""
  });

  /* ────── HELPERS ────── */
  const money      = n => `$${Number(n).toFixed(2)}`;
  const formatDate = d => new Date(d).toLocaleDateString();

  const fetchSorted = async (col, dir) => {
    try {
      const url = `http://localhost:3001/api/sorter?tbl=ProductReview&col=${col}&op=${dir}`;
      const r   = await fetch(url);
      if (!r.ok) throw new Error("sort fetch failed");
      const data = await r.json();
      setReviews(data.filter(e => String(e.Product_ID) === String(id)));
    } catch (e) { console.error(e); }
  };

  const toggleSort = col => {
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
            alt=""
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
        if (![pRes, sRes, rRes].every(r => r.ok)) throw new Error("Request failed");

        const pData = await pRes.json();
        setProduct(pData);
        setEditFields({
          new_name:             pData.name,
          new_category:         pData.category,
          new_retail_price:     pData.retail_price,
          new_purchasing_price: pData.purchasing_price
        });
        setSupplier(await sRes.json());
        setReviews(await rRes.json());
        if (dRes.ok) setDiscount(await dRes.json());
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

  /* ────── SUBMIT EDIT ────── */
  const submitEdit = async () => {
    try {
      const payload = {
        new_Product_ID:       product.Product_ID,
        new_name:             editFields.new_name,
        new_category:         editFields.new_category,
        new_retail_price:     parseFloat(editFields.new_retail_price),
        new_purchasing_price: parseFloat(editFields.new_purchasing_price),
        new_ratings:          product.ratings,
        new_Supplier_ID:      product.Supplier_ID,
        new_Discount_ID:      product.Discount_ID
      };

      const resp = await fetch("http://localhost:3001/api/products/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error("Update failed");

      setProduct({ ...product, ...{
          name:             payload.new_name,
          category:         payload.new_category,
          retail_price:     payload.new_retail_price,
          purchasing_price: payload.new_purchasing_price
        }});
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("Update failed – see console for details.");
    }
  };

  /* ────── COLUMNS ────── */
  const reviewColumns = [
    { key: "Review_ID",   name: header("ID", "Review_ID"), width: 60 },
    { key: "rating",      name: header("Rating", "rating"), width: 80 },
    { key: "comment",     name: header("Comment", "comment"), resizable: true,
      formatter: ({ row }) => <span title={row.comment}>{row.comment}</span> },
    { key: "review_date", name: header("Date", "review_date"), width: 180,
      formatter: ({ row }) => formatDate(row.review_date) },
    { key: "Customer_ID", name: header("Customer", "Customer_ID"), width: 100 }
  ];

  /* ────── RENDER ────── */
  return (
      <div className={`product-detail-page ${className}`} style={{ padding: 40, display: "flex", flexDirection: "column", gap: 64 }} {...props}>

        {/* ⇢ PRODUCT & SUPPLIER */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: 40 }}>
          {/* —— Product —— */}
          <div style={{ flex: "1 1 280px" }}>
            <h2>Product Information</h2>

            {isEditing ? (
                <>
                  {["new_name", "new_category", "new_retail_price", "new_purchasing_price"].map(key => (
                      <div className="metric" key={key}>
                        <div className="title4">{key.replace(/^new_/, "").replace(/_/g, " ")}</div>
                        <input
                            name={key}
                            value={editFields[key]}
                            onChange={e => setEditFields({ ...editFields, [key]: e.target.value })}
                            style={{ padding: 6, border: "1px solid #ccc", borderRadius: 4, color: "#222" }}
                        />
                      </div>
                  ))}

                  <div className="metric"><div className="title4">Overall rating</div><div className="data">{Number(product.ratings).toFixed(1)}/5.0</div></div>

                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button onClick={submitEdit}
                            style={{ color: 'black' }}>Submit</button>
                    <button onClick={() => setIsEditing(false)}
                            style={{ color: 'black' }}>Cancel</button>
                  </div>
                </>
            ) : (
                <>
                  <div className="metric"><div className="title4">Name</div><div className="data">{product.name}</div></div>
                  <div className="metric"><div className="title4">Category</div><div className="data">{product.category}</div></div>
                  <div className="metric"><div className="title4">Retail price</div><div className="data">{money(product.retail_price)}</div></div>
                  <div className="metric"><div className="title4">Purchasing price</div><div className="data">{money(product.purchasing_price)}</div></div>
                  <div className="metric"><div className="title4">Overall rating</div><div className="data">{Number(product.ratings).toFixed(1)}/5.0</div></div>

                  <button
                      onClick={() => setIsEditing(true)}
                      style={{ color: 'black' }}
                  >
                    Edit
                  </button>
                </>
            )}
          </div>

          {/* —— Supplier —— */}
          <div style={{ flex: "1 1 280px" }}>
            <h2>Supplier Information</h2>
            <div className="metric"><div className="title4">Name</div><div className="data">{supplier.name}</div></div>
            <div className="metric"><div className="title4">Phone</div><div className="data">{supplier.phone}</div></div>
            <div className="metric"><div className="title4">Email</div><div className="data">{supplier.email}</div></div>
          </div>
        </section>

        {/* ⇢ DISCOUNT */}
        <section>
          <h2>Current Discount</h2>
          {discount ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                <div className="metric"><div className="title4">Discount_ID</div><div className="data">{discount.Discount_ID}</div></div>
                <div className="metric"><div className="title4">discount_type</div><div className="data">{discount.discount_type}</div></div>
                <div className="metric"><div className="title4">discount_value</div><div className="data">{discount.discount_value}%</div></div>
                <div className="metric"><div className="title4">start_date</div><div className="data">{formatDate(discount.start_date)}</div></div>
                <div className="metric"><div className="title4">end_date</div><div className="data">{formatDate(discount.end_date)}</div></div>
              </div>
          ) : <p style={{ fontStyle: "italic", color: "gray" }}>No active discount found for this product.</p>}
        </section>

        {/* ⇢ CUSTOMER REVIEWS */}
        <section>
          <h2>Customer Reviews</h2>
          <DataGrid columns={reviewColumns} rows={reviews} style={{ height: 400 }} />
        </section>
      </div>
  );
};
