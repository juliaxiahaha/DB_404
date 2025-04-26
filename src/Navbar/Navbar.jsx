import React from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import search from "./assets/ic-search0.svg";

const Navbar = () => {
    const navigate = useNavigate();
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
                {role !== "Employee" && (
                    <button className="tab" onClick={() => navigate("/employees")}>
                        Employees
                    </button>
                )}

                {/* Supplier -> Button */}
                {role !== "Employee" && (
                    <button className="tab" onClick={() => navigate("/supplier")}>
                        Supplier
                    </button>
                )}
                <button className="tab" onClick={() => navigate("/login")}>Login</button>
                <div className="textfield">
                    <div className="text">Search in site</div>
                    <img className="ic-search" src={search} alt="Search" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;