import React from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import storeimg from "./assets/store-svgrepo-com.svg";

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
            <div className="rectangle-4137">
              <img src={storeimg} alt="Store Icon" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <button
                className="title"
                onClick={() => navigate("/")}
            >
                Store Management System
            </button>
            <div className="navigation">
                {token && (
                    <>
                        <button className="tab" onClick={() => navigate("/discount")}>
                            Discount
                        </button>
                        <button className="tab" onClick={() => navigate("/customer")}>Customer</button>
                        <button className="tab" onClick={() => navigate("/products")}>
                            Products
                        </button>

                        <button className="tab" onClick={() => navigate("/orders")}>
                            Orders
                        </button>

                        {(role === "Developer" || role === "Manager") && (
                            <button className="tab" onClick={() => navigate("/employees")}>
                                Employees
                            </button>
                        )}

                        {(role === "Developer" || role === "Manager") && (
                            <button className="tab" onClick={() => navigate("/supplier")}>
                                Supplier
                            </button>
                        )}
                    </>
                )}
                <button className="tab" onClick={() => navigate("/login")}>Login</button>

                {token && (
                    <button
                        className="logout-button"
                        style={{ marginLeft: "auto", marginRight: "10px" }}
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login"; // Redirect and reload
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
