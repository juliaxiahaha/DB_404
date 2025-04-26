import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './OrderDetailPage.css';

export const OrderDetailPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/orderDetails/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const rawDetails = res.data;

                const enrichedDetails = await Promise.all(
                    rawDetails.map(async (item) => {
                        try {
                            const productRes = await axios.get(`http://localhost:3001/api/products/${item.Product_ID}`, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                            return {
                                ...item,
                                Product_Name: productRes.data.name,
                                Unit_Price: parseFloat(productRes.data.retail_price),
                                Category: productRes.data.category
                            };
                        } catch (err) {
                            return {
                                ...item,
                                Product_Name: 'N/A',
                                Unit_Price: 0,
                                Category: 'N/A'
                            };
                        }
                    })
                );

                setOrderDetails(enrichedDetails);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch order details:", err);
                setError('Failed to fetch order details.');
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const totalPrice = orderDetails.reduce((sum, item) => sum + item.Unit_Price * item.product_quantity, 0).toFixed(2);

    if (loading) return <div className="order-detail-page">Loading...</div>;
    if (error) return <div className="order-detail-page">{error}</div>;
    if (!orderDetails.length) return <div className="order-detail-page">No details found for this order.</div>;

    return (
        <div className="order-detail-page">
            <div className="order-header">
                <h1>Order #{orderId}</h1>
                <p>Details of products in this order</p>
            </div>

            <section className="products-section">
                <h2>Products in Order</h2>
                <div className="product-container">
                    {orderDetails.map((item, idx) => (
                        <div key={idx} className="product-card">
                            <div className="product-category">Category: {item.Category}</div>
                            <div className="product-title">{item.Product_Name}</div>
                            <div className="product-detail">Qty: {item.product_quantity}</div>
                            <div className="product-detail">Price: ${item.Unit_Price.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-details">
                    <div className="summary-item">
                        <div className="emoji">😊</div>
                        <div className="label">Total Price</div>
                        <div className="sub-label">Including Taxes</div>
                        <div className="value">${totalPrice}</div>
                    </div>
                    <div className="summary-item">
                        <div className="emoji">📦</div>
                        <div className="label">Departure</div>
                        <div className="sub-label">Warehouse Address</div>
                        <div className="value">370 Jay st., Brooklyn, NY</div>
                    </div>
                    <div className="summary-item">
                        <div className="emoji">🛒</div>
                        <div className="label">Shipping Address</div>
                        <div className="sub-label">Home Address</div>
                        <div className="value">123 Main St, City</div>
                    </div>
                </div>
            </section>

            <div className="footer">
                Contact Us: buyaozhaowomen@store.com
            </div>
        </div>
    );
};
