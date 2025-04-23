import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerPage.css";

// Import all images here
import image190 from "/src/CustomerPage/assets/image-190.png";
import image180 from "/src/CustomerPage/assets/image-180.png";
import image200 from "/src/CustomerPage/assets/image-200.png";
import image201 from "/src/CustomerPage/assets/image-201.png";
import image210 from "/src/CustomerPage/assets/image-210.png";
import image220 from "/src/CustomerPage/assets/image-220.png";
import image230 from "/src/CustomerPage/assets/image-230.png";
import image240 from "/src/CustomerPage/assets/image-240.png";
import image250 from "/src/CustomerPage/assets/image-250.png";
import image260 from "/src/CustomerPage/assets/image-260.png";
import mg7617_10 from "/src/CustomerPage/assets/img-7617-10.png";
import image280 from "/src/CustomerPage/assets/image-280.png";
import image320 from "/src/CustomerPage/assets/image-320.png";
import image40 from "/src/CustomerPage/assets/image-40.png";
import vector2000 from "/src/CustomerPage/assets/vector-2000.svg";

export const CustomerPage = ({ className, ...props }) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/customers")
            .then(res => setCustomers(res.data))
            .catch(err => console.error("Failed to load customers:", err));
    }, []);

    return (
        <div className={"customer-page " + className}>
            <div className="list">
                <div className="container">
                    <div className="title">Select a customer from the customer list: </div>
                </div>
                <div className="list2">
                    <div className="row">
                        {customers.map((customer, index) => (
                            <div key={index} className="item">
                                <div className="frame">
                                    <div className="icon">👤</div>
                                </div>
                                <div className="frame-427318906">
                                    <div className="title2">{customer.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <img className="img-8734-1" src="img-8734-10.png" /> */}
                {/* (Nav bar removed) */}
                <div className="section">
                    <div className="container2">
                        <div className="title4">Contact Us: buyaozhaowomen@store.com </div>
                        <div className="title5">Copyright © 2025 Store Management </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
