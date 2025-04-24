import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerPage.css";
import minusUserIcon from "./assets/minus-user-svgrepo-com.svg";
import plusUserIcon from "./assets/plus-user-svgrepo-com.svg";


export const CustomerPage = ({ className, ...props }) => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/api/customers/${id}`)
        .then(() => setCustomers(prev => prev.filter(c => c.Customer_ID !== id)))
        .catch(err => console.error("Delete failed:", err));
    };

    const handleInsert = () => {
        const newCustomer = {
            new_Customer_ID: prompt("Enter Customer ID"),
            new_name: prompt("Enter Name"),
            new_address: prompt("Enter Address"),
            new_phone: prompt("Enter Phone"),
            new_email: prompt("Enter Email"),
            new_membership_registration_date: prompt("Enter Registration Date (YYYY-MM-DD)")
        };

      axios.post("http://localhost:3001/api/customers/insert", newCustomer)
        .then(() => axios.get("http://localhost:3001/api/customers"))
        .then(res => setCustomers(res.data))
        .catch(err => console.error("Insert failed:", err));
    };

    useEffect(() => {
        axios.get("http://localhost:3001/api/customers")
            .then(res => setCustomers(res.data))
            .catch(err => console.error("Failed to load customers:", err));
    }, []);

    return (
        <div className={"customer-page " + className}>
            <div className="list">
                <div className="container">
                    <div className="title">
                      Select a customer from the customer list:
                      <img
                        src={plusUserIcon}
                        alt="Add Customer"
                        style={{ width: "24px", height: "24px", marginLeft: "10px", cursor: "pointer" }}
                        onClick={handleInsert}
                      />
                    </div>
                </div>
                <div className="list2">
                    <div className="row">
                        {customers.map((customer, index) => (
                            <div key={index} className="item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                              <div onClick={() => navigate(`/customer/${customer.Customer_ID}`)} style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="frame">
                                    <div className="icon">👤</div>
                                </div>
                                <div className="frame-427318906">
                                    <div className="title2">{customer.name}</div>
                                </div>
                              </div>
                              <img
                                src={minusUserIcon}
                                alt="Delete Customer"
                                style={{ width: "20px", height: "20px", marginLeft: "10px", cursor: "pointer" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(customer.Customer_ID);
                                }}
                              />
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
