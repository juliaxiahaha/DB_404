// OrderDetailPage.jsx
import "./OrderDetailPage.css";
import productImage from "./assets/download.jpeg";

export const OrderDetailPage = () => {
    return (
        <div className="order-detail-page">
            <div className="order-header">
                <h1>Order #1023</h1>
                <p>Details of products in this order</p>
            </div>

            <div className="products-section">
                <h2>Products in Order</h2>
                <div className="product-list">
                    {["A", "B", "C"].map((category, index) => (
                        <div className="product-card" key={index}>
                            <img src={productImage} alt={`Product ${category}`} />
                            <div className="product-category">Category {category}</div>
                            <div className="product-title">Product {category}</div>
                            <div className="product-details">Details</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="order-summary">
                <h2>Order Summary</h2>
                <div className="summary-details">
                    <div className="summary-item">
                        <div className="emoji">😊</div>
                        <div className="label">Total Price</div>
                        <div className="sub-label">Including Taxes</div>
                        <div className="value">$100</div>
                    </div>
                    <div className="summary-item">
                        <div className="emoji placeholder"></div>
                        <div className="label">Departure</div>
                        <div className="value">370 Jay st.,<br />Brooklyn, NY</div>
                    </div>
                    <div className="summary-item">
                        <div className="emoji cart">🛒</div>
                        <div className="label">Shipping Address</div>
                        <div className="sub-label">Home Address</div>
                        <div className="value">123 Main St, City</div>
                    </div>
                </div>
            </div>

            <div className="footer">
                <span>Contact Us: buyaozhaowomen@store.com</span>
                <span>Copyright © 2025 Store Management</span>
            </div>
        </div>
    );
};