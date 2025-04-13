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
                <div className="tab">Discount</div>
                <button className="tab" onClick={() => navigate("/customer")}>Customer</button>
                <div className="tab">Products</div>
                <div className="tab">Orders</div>
                <div className="tab">Employees</div>
                <div className="tab">Supplier</div>
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