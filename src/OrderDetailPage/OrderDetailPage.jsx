// src/OrderDetailPage/OrderDetailPage.jsx
import "./OrderDetailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const OrderDetailPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [shipping, setShipping] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

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

            const orderRes = await axios.get(`http://localhost:3001/api/orders/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const orderData = orderRes.data;
            const shippingId = orderData.Shipping_ID;

            if (shippingId) {
                const shippingRes = await axios.get(`http://localhost:3001/api/shippings/${shippingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setShipping(shippingRes.data);
            }

            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch order details:", err);
            setError('Failed to fetch order details.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`http://localhost:3001/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await fetchOrderDetails();
        } catch (err) {
            console.error('Failed to delete product:', err);
        }
    };

    if (loading) return <div className="order-detail-page">Loading...</div>;
    if (error) return <div className="order-detail-page">{error}</div>;

    const totalPrice = orderDetails.reduce((acc, item) => acc + (item.Unit_Price * item.product_quantity), 0).toFixed(2);

    return (
        <div className="order-detail-page">
            <div className="order-header">
                <h1>Order Details - Order #{orderId}</h1>
            </div>

            <div className="products-section">
                <h2>Products in Order</h2>
                <div className="product-container">
                    {orderDetails.map((product) => (
                        <div key={product.Product_ID} className="product-card">
                            <div className="product-category">{product.Category}</div>
                            <div className="product-title">{product.Product_Name}</div>
                            <div className="product-detail">Quantity: {product.product_quantity}</div>
                            <div className="product-detail">Price: ${product.Unit_Price}</div>
                            <div className="product-detail">Status: {product.order_status}</div>
                            <button
                                onClick={() => handleDeleteProduct(product.Product_ID)}
                                className="delete-button"
                                style={{
                                    marginTop: '8px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

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
                        <div className="value">{shipping?.departure || 'Loading...'}</div>
                    </div>
                    <div className="summary-item">
                        <div className="emoji">🛒</div>
                        <div className="label">Shipping Address</div>
                        <div className="sub-label">Home Address</div>
                        <div className="value">{shipping?.destination || 'Loading...'}</div>
                    </div>
                </div>
            </section>
        </div>
    );
};
