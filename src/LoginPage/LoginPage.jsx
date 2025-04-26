import "./LoginPage.css";
import { useState } from "react";

export const LoginPage = ({ className, ...props }) => {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState("");

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword
                })
            });
            const data = await response.json();
            if (data.success) {
                console.log(data.success);
                localStorage.setItem("username", data.username);
                localStorage.setItem("role", data.role);
                console.log(localStorage.getItem("username"));
                console.log(localStorage.getItem("role"));
                alert("Login successful!");
                setLoginError("");
            } else {
                setLoginError("Invalid username or password");
            }
        } catch (error) {
            setLoginError("Network error");
        }
    };

    const handleRegister = async () => {
        if (registerPassword !== confirmPassword) {
            setRegisterError("Passwords do not match");
            return;
        }
        if (registerPassword.length < 8) {
            setRegisterError("Password must be at least 8 characters");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: registerUsername,
                    password: registerPassword
                })
            });
            const data = await response.json();
            if (response.ok) {
                setShowRegisterModal(false);
                alert("Registration successful!");
            } else {
                setRegisterError(data.error || "Registration failed");
            }
        } catch (error) {
            setRegisterError("Network error");
        }
    };

    return (
        <div className={"login-page " + className}>
            <div className="section">
                <div className="container">
                    <img className="giphy-1" src="giphy-10.png" />
                    <div className="title">Contact Us: buyaozhaowomen@store.com</div>
                    <div className="title2">Copyright © 2025 Store Management</div>
                </div>
            </div>
            <div className="form">
                <div className="container2">
                    <div className="title3">Login Form</div>
                </div>
                <div className="list">
                    <div className="row">
                        <div className="input">
                            <div className="title4">Username</div>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Password</div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <div className="info">Password must be at least 8 characters</div>
                        </div>
                    </div>
                    {loginError && <div className="error" style={{ color: "red" }}>{loginError}</div>}
                    <div className="button">
                        <div className="seconday" onClick={() => setShowRegisterModal(true)}>
                            <div className="title5">Create an Account</div>
                        </div>
                        <div className="primary" onClick={handleLogin}>
                            <div className="title6">Login</div>
                        </div>
                    </div>
                </div>
                <img className="vector-200" src="vector-2000.svg" />
            </div>

            {showRegisterModal && (
                <div className="register-modal">
                    <div className="modal-content">
                        <h3>Create Account</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {registerError && <div className="error">{registerError}</div>}
                        <button onClick={handleRegister}>Submit</button>
                        <button onClick={() => setShowRegisterModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};
