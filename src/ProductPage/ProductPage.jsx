// src/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './ProductPage.css';
import section1 from '/src/ProductPage/assets/section1.svg';
import vector2000 from '/src/ProductPage/assets/vector-2000.svg';
import addProductIcon from '/src/ProductPage/assets/add_product.svg';
import deleteIcon from '/src/ProductPage/assets/delete.svg';

export const ProductPage = ({ className, ...props }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        new_Product_ID: '',
        new_name: '',
        new_category: '',
        new_retail_price: '',
        new_purchasing_price: '',
        new_Supplier_ID: '',
        new_Discount_ID: ''
    });


    const token = localStorage.getItem("token");
    let role = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (err) {
            console.error("Failed to decode token", err);
        }
    }

    const fetchProducts = () => {
        axios.get('http://localhost:3001/api/products', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setProducts(res.data))
            .catch(err => {
                console.error(err);
                setError('failed to load the products');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const submitNewProduct = () => {
        axios.post('http://localhost:3001/api/products/insert', {
            new_Product_ID: parseInt(newProduct.new_Product_ID, 10),
            new_name: newProduct.new_name,
            new_category: newProduct.new_category,
            new_retail_price: parseFloat(newProduct.new_retail_price),
            new_purchasing_price: parseFloat(newProduct.new_purchasing_price),
            new_ratings: 5,
            new_Supplier_ID: parseInt(newProduct.new_Supplier_ID, 10),
            new_Discount_ID: parseInt(newProduct.new_Discount_ID, 10)
        }, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setShowForm(false);
                setNewProduct({
                    new_Product_ID: '',
                    new_name: '',
                    new_category: '',
                    new_retail_price: '',
                    new_purchasing_price: '',
                    new_Supplier_ID: '',
                    new_Discount_ID: ''
                });
                fetchProducts(); // 刷新产品
            })
            .catch(console.error);
    };

    const deleteProduct = (id) => {
        const confirmed = window.confirm(`Are you sure you want to delete product ${id}?`);
        if (!confirmed) return;

        axios.delete(`http://localhost:3001/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => fetchProducts())
            .catch(err => {
                console.error(`Failed to delete product ${id}:`, err);
                alert('Failed to delete product.');
            });
    };

    if (loading) return <div className="product-page">loading...</div>;
    if (error) return <div className="product-page">{error}</div>;

    const chunk = (arr, size) =>
        arr.reduce((acc, _, i) => i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc, []);
    const rows = chunk(products, 5);

    return (
        <div className={`product-page ${className}`} {...props}>
            <div className="section">
                <div className="container">
                    <div className="title">Contact Us</div>
                    <div className="title2">Terms &amp; Conditions</div>
                    <div className="title3">Privacy Policy</div>
                </div>
            </div>

            <img className="section2" src={section1} />

            <div className="section3">
                <div className="container2">
                    <div className="title4">Select a product from the product list:</div>
                </div>
                <img className="vector-200" src={vector2000} />
            </div>

            <div className="list">
                {rows.map((row, ri) => (
                    <div className="row" key={ri}>
                        {row.map(prod => (
                            <div className="item" key={prod.Product_ID}>
                                <Link to={`/products/${prod.Product_ID}`}>
                                    <div className="frame" style={{ position: 'relative' }}>
                                        {/* 删除图标，靠近📦 */}
                                        <img
                                            src={deleteIcon}
                                            alt="Delete"
                                            style={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                width: 20,
                                                height: 20,
                                                cursor: 'pointer'
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault(); // 阻止跳转
                                                deleteProduct(prod.Product_ID);
                                            }}
                                        />
                                        <div className="icon">📦</div>
                                    </div>
                                </Link>
                                <div className="frame-427318906">
                                    <div className="title5">{prod.name || prod.ProductName}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

                <div className="row">
                    <div className="item" onClick={() => setShowForm(true)}>
                        <div className="frame" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={addProductIcon} alt="Add Product" style={{ width: 64, height: 64 }} />
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">Add Product</div>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <div style={{ background: '#fff', padding: 20, position: 'fixed', top: 120, left: '50%', transform: 'translateX(-50%)', zIndex: 1000, boxShadow: '0 4px 16px rgba(0,0,0,0.2)', borderRadius: 12, minWidth: 320 }}>
                    <h3 style={{ marginBottom: 1, color: '#000' }}>Add New Product</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {Object.entries(newProduct).map(([key, value]) => (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor={key} style={{ fontWeight: 500, marginBottom: 2 }}>{key}</label>
                                <input
                                    id={key}
                                    name={key}
                                    type="text"
                                    placeholder={`Enter ${key}`}
                                    value={value}
                                    onChange={handleInputChange}
                                    style={{ padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, color: '#000' }}
                                />
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                        <button onClick={submitNewProduct} style={{ background: '#000', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: 4 }}>Done</button>
                        <button onClick={() => setShowForm(false)} style={{ background: '#000', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: 4 }}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="section4">
                <div className="container3">
                    <div className="title7">Contact Us: buyaozhaowomen@store.com</div>
                    <div className="title8">Copyright © 2025 Store Management</div>
                </div>
            </div>
        </div>
    );
};