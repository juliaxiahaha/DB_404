import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="top-bar">
            <div className="rectangle-4137"></div>
            <button
                className="title"
                onClick={() => navigate("/")}
            >
                Store Management System
            </button>
            <div className="navigation">
                <button className="tab" onClick={() => navigate("/discount")}>
                    Discount
                </button>
                <button className="tab" onClick={() => navigate("/customer")}>Customer</button>
                <button className="tab" onClick={() => navigate("/products")}>
                    Products
                </button>

                {/* Orders -> Button */}
                <button className="tab" onClick={() => navigate("/orders")}>
                    Orders
                </button>

                {/* Employees -> Button */}
                <button className="tab" onClick={() => navigate("/employees")}>
                    Employees
                </button>

                {/* Supplier -> Button */}
                <button className="tab" onClick={() => navigate("/supplier")}>
                    Supplier
                </button>
                <button className="tab" onClick={() => navigate("/login")}>Login</button>
                <div className="textfield">
                    <div className="text">Search in site</div>
                    <img className="ic-search" src="ic-search0.svg" alt="Search" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;