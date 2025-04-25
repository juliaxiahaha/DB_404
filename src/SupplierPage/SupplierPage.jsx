import React, { useEffect, useState } from "react";
import { DataGrid } from "react-data-grid";
import axios from "axios";
import "./SupplierPage.css";
import counterIcon from "./assets/ic-arrow-drop-down0.svg";
import searchIcon from "./assets/filter-svgrepo-com.svg";

export const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({
        new_Supplier_ID: "",
        new_name: "",
        new_phone: "",
        new_email: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch all suppliers
    const fetchAllSuppliers = () => {
        axios
            .get("http://localhost:3001/api/suppliers")
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Fetch suppliers failed:", err));
    };

    useEffect(() => {
        fetchAllSuppliers();
    }, []);

    // Form change handler
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Sort handler
    const handleSort = column => {
        axios
            .get("http://localhost:3001/api/sorter", {
                params: { tbl: "Supplier", col: column, op: "ASC" }
            })
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Sort suppliers failed:", err));
    };

    // Search handler
    const handleSearch = column => {
        const value = prompt(`Enter value to search in ${column}`);
        if (!value) return fetchAllSuppliers();
        axios
            .get("http://localhost:3001/api/search", {
                params: { table: "Supplier", col: column, val: value }
            })
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Search suppliers failed:", err));
    };

    // Reset form
    const resetForm = () => {
        setFormData({ new_Supplier_ID: "", new_name: "", new_phone: "", new_email: "" });
        setIsEditing(false);
        setMessage("");
    };

    // Save new supplier
    const handleSave = () => {
        axios
            .post("http://localhost:3001/api/suppliers/insert", formData)
            .then(() => fetchAllSuppliers())
            .then(() => resetForm())
            .catch(err => console.error("Insert supplier failed:", err));
    };

    // Update existing supplier
    const handleUpdate = () => {
        axios
            .put("http://localhost:3001/api/suppliers/update", formData)
            .then(() => {
                setMessage("Supplier updated!");
                resetForm();
                fetchAllSuppliers();
            })
            .catch(err => {
                console.error("Update supplier failed:", err);
                setMessage("Update failed.");
            });
    };

    // Delete supplier
    const handleDelete = id => {
        if (!window.confirm("Are you sure you want to delete this supplier?")) return;
        axios
            .delete(`http://localhost:3001/api/suppliers/${id}`)
            .then(() => {
                setMessage("Supplier deleted!");
                fetchAllSuppliers();
            })
            .catch(err => {
                console.error("Delete supplier failed:", err);
                setMessage("Delete failed.");
            });
    };

    // Start edit mode
    const startEdit = row => {
        setFormData({
            new_Supplier_ID: row.Supplier_ID,
            new_name: row.name,
            new_phone: row.phone,
            new_email: row.email
        });
        setIsEditing(true);
        setMessage("");
    };

    // DataGrid columns
    const columns = [
        {
            key: "Supplier_ID",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    ID
                    <img src={counterIcon} alt="sort" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSort("Supplier_ID")} />
                    <img src={searchIcon} alt="search" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSearch("Supplier_ID")} />
                </div>
            )
        },
        {
            key: "name",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Name
                    <img src={counterIcon} alt="sort" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSort("name")} />
                    <img src={searchIcon} alt="search" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSearch("name")} />
                </div>
            )
        },
        {
            key: "phone",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Phone
                    <img src={counterIcon} alt="sort" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSort("phone")} />
                    <img src={searchIcon} alt="search" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSearch("phone")} />
                </div>
            )
        },
        {
            key: "email",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    Email
                    <img src={counterIcon} alt="sort" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSort("email")} />
                    <img src={searchIcon} alt="search" style={{ width: 14, cursor: "pointer" }} onClick={() => handleSearch("email")} />
                </div>
            )
        },
        {
            key: "actions",
            name: "Actions",
            renderCell: ({ row }) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => startEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.Supplier_ID)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <div className="supplier-page">
            <div className="form container3">
                <h2>{isEditing ? "Edit Supplier" : "Add New Supplier"}</h2>
                <label>
                    ID
                    <input
                        type="text"
                        name="new_Supplier_ID"
                        value={formData.new_Supplier_ID}
                        onChange={handleChange}
                        placeholder="Enter supplier ID"
                    />
                </label>
                <label>
                    Name
                    <input
                        type="text"
                        name="new_name"
                        value={formData.new_name}
                        onChange={handleChange}
                        placeholder="Enter supplier name"
                    />
                </label>
                <label>
                    Phone
                    <input
                        type="text"
                        name="new_phone"
                        value={formData.new_phone}
                        onChange={handleChange}
                        placeholder="Enter supplier phone"
                    />
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        name="new_email"
                        value={formData.new_email}
                        onChange={handleChange}
                        placeholder="Enter supplier email"
                    />
                </label>
                <div className="buttons">
                    {isEditing ? (
                        <>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={resetForm}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleSave}>Add Supplier</button>
                    )}
                </div>
                {message && <div className="message">{message}</div>}
            </div>

            <div className="container4" style={{ height: 400 }}>
                <DataGrid columns={columns} rows={suppliers} />
            </div>
        </div>
    );
};
