// src/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';
import section1 from '/src/ProductPage/assets/section1.svg';
import vector2000 from '/src/ProductPage/assets/vector-2000.svg';

export const ProductPage = ({ className, ...props }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(res => setProducts(res.data))
            .catch(err => {
                console.error(err);
                setError('failed to load');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="product-page">加载中…</div>;
    if (error)   return <div className="product-page">{error}</div>;

    const chunk = (arr, size) =>
        arr.reduce((acc, _, i) =>
                i % size === 0
                    ? [...acc, arr.slice(i, i + size)]
                    : acc
            , []);
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
                            <div className="item" key={prod.id || prod.ProductID}>
                                <div className="frame">
                                    <div className="icon">📦</div>
                                </div>
                                <div className="frame-427318906">
                                    <div className="title5">{prod.name || prod.product_name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="section4">
                <div className="container3">
                    <div className="title7">Contact Us: buyaozhaowomen@store.com</div>
                    <div className="title8">Copyright © 2025 Store Management</div>
                </div>
            </div>
        </div>
    );
};
