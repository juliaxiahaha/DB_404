import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomerPage.css";
import minusUserIcon from "./assets/minus-user-svgrepo-com.svg";
import plusUserIcon from "./assets/plus-user-svgrepo-com.svg";


export const CustomerPage = ({ className, ...props }) => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
      new_Customer_ID: "",
      new_name: "",
      new_address: "",
      new_phone: "",
      new_email: "",
      new_membership_registration_date: ""
    });
    const [isFormVisible, setFormVisible] = useState(false);
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const canAddCustomers = role === "Developer" || role === "Manager";

    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/api/customers/${id}`)
        .then(() => setCustomers(prev => prev.filter(c => c.Customer_ID !== id)))
        .catch(err => console.error("Delete failed:", err));
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
      axios.post("http://localhost:3001/api/customers/insert", formData)
        .then(() => axios.get("http://localhost:3001/api/customers"))
        .then(res => {
          setCustomers(res.data);
          setFormVisible(false);
          setFormData({
            new_Customer_ID: "",
            new_name: "",
            new_address: "",
            new_phone: "",
            new_email: "",
            new_membership_registration_date: ""
          });
        })
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
                      {canAddCustomers && (
                        <img
                          src={plusUserIcon}
                          alt="Add Customer"
                          style={{ width: "24px", height: "24px", marginLeft: "10px", cursor: "pointer" }}
                          onClick={() => setFormVisible(!isFormVisible)}
                        />
                      )}
                    </div>
                </div>
                <div className="list2">
                    {canAddCustomers && isFormVisible && (
                      <div className="form container3">
                        <h2>Add New Customer</h2>

                        <label>
                          Customer ID
                          <input
                            name="new_Customer_ID"
                            value={formData.new_Customer_ID}
                            onChange={handleChange}
                            placeholder="Enter Customer ID"
                          />
                        </label>

                        <label>
                          Name
                          <input
                            name="new_name"
                            value={formData.new_name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                          />
                        </label>

                        <label>
                          Email
                          <input
                            name="new_email"
                            value={formData.new_email}
                            onChange={handleChange}
                            placeholder="Enter email"
                          />
                        </label>

                        <label>
                          Phone
                          <input
                            name="new_phone"
                            value={formData.new_phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                          />
                        </label>

                        <label>
                          Address
                          <input
                            name="new_address"
                            value={formData.new_address}
                            onChange={handleChange}
                            placeholder="Enter address"
                          />
                        </label>

                        <label>
                          Registration Date
                          <input
                            name="new_membership_registration_date"
                            type="date"
                            value={formData.new_membership_registration_date}
                            onChange={handleChange}
                          />
                        </label>

                        <div className="buttons">
                          <button onClick={handleSave}>Add Customer</button>
                          <button onClick={() => setFormVisible(false)}>Cancel</button>
                        </div>
                      </div>
                    )}
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
                              {canAddCustomers && (
                                <img
                                  src={minusUserIcon}
                                  alt="Delete Customer"
                                  style={{ width: "20px", height: "20px", marginLeft: "10px", cursor: "pointer" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(customer.Customer_ID);
                                  }}
                                />
                              )}
                            </div>
                        ))}
                    </div>
                </div>

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
