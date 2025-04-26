// SupplierPage.jsx
import 'react-data-grid/lib/styles.css';
import React, { useEffect, useState } from "react";
import { DataGrid } from "react-data-grid";
import axios from "axios";
import "./SupplierPage.css";
import counterIcon from "./assets/ic-arrow-drop-down0.svg";
import searchIcon from "./assets/filter-svgrepo-com.svg";
import { jwtDecode } from "jwt-decode";

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

    // Generate a simple 4-digit ID
    const generateSupplierId = () => Math.floor(1000 + Math.random() * 9000);

    // Format phone as XXX-XXX-XXXX
    const formatPhoneNumber = (input) => {
        const digits = input.replace(/\D/g, '').slice(0, 10);
        const part1 = digits.slice(0, 3);
        const part2 = digits.slice(3, 6);
        const part3 = digits.slice(6, 10);
        if (digits.length > 6) return `${part1}-${part2}-${part3}`;
        if (digits.length > 3) return `${part1}-${part2}`;
        return part1;
    };

    // Fetch all suppliers
    const fetchAllSuppliers = () => {
        axios
            .get("http://localhost:3001/api/suppliers", {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Fetch suppliers failed:", err));
    };

    useEffect(() => {
        fetchAllSuppliers();
    }, []);

    // Form change handler
    const handleChange = (e) => {
        const { name } = e.target;
        let { value } = e.target;
        if (name === 'new_phone') {
            value = formatPhoneNumber(value);
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Reset form
    const resetForm = () => {
        setFormData({ new_Supplier_ID: "", new_name: "", new_phone: "", new_email: "" });
        setIsEditing(false);
        setMessage("");
    };

    // Save new supplier
    const handleSave = () => {
        const generatedId = generateSupplierId();
        const payload = {
            new_Supplier_ID: generatedId,
            new_name: formData.new_name,
            new_phone: formData.new_phone,
            new_email: formData.new_email
        };
        axios
            .post("http://localhost:3001/api/suppliers/insert", payload, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                fetchAllSuppliers();
                setMessage(`Supplier added with ID ${generatedId}`);
                resetForm();
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => {
                console.error("Insert supplier failed:", err);
                setMessage("Insert failed.");
                setTimeout(() => setMessage(""), 3000);
            });
    };

    // Update existing supplier
    const handleUpdate = () => {
        const payload = { ...formData };
        axios
            .put("http://localhost:3001/api/suppliers/update", payload, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                setMessage("Supplier updated!");
                fetchAllSuppliers();
                resetForm();
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => {
                console.error("Update supplier failed:", err);
                setMessage("Update failed.");
                setTimeout(() => setMessage(""), 3000);
            });
    };

    // Delete supplier
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this supplier?")) return;
        axios
            .delete(`http://localhost:3001/api/suppliers/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                setMessage("Supplier deleted!");
                fetchAllSuppliers();
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => {
                console.error("Delete supplier failed:", err);
                setMessage("Delete failed.");
                setTimeout(() => setMessage(""), 3000);
            });
    };

    // Start edit mode
    const startEdit = (row) => {
        setFormData({
            new_Supplier_ID: row.Supplier_ID,
            new_name: row.name,
            new_phone: row.phone,
            new_email: row.email
        });
        setIsEditing(true);
        setMessage("");
    };

    // Sort handler
    const handleSort = (column) => {
        axios
            .get("http://localhost:3001/api/sorter", {
                params: { tbl: "Supplier", col: column, op: "ASC" },
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Sort suppliers failed:", err));
    };

    // Search handler
    const handleSearch = (column) => {
        const value = prompt(`Enter value to search in ${column}`);
        if (!value) return fetchAllSuppliers();
        axios
            .get("http://localhost:3001/api/search", {
                params: { table: "Supplier", col: column, val: value },
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setSuppliers(res.data))
            .catch(err => console.error("Search suppliers failed:", err));
    };

    const renderHeader = (label, key) => (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {label}
            <img
                src={counterIcon}
                alt="sort"
                style={{ width: 14, cursor: "pointer" }}
                onClick={() => handleSort(key)}
            />
            <img
                src={searchIcon}
                alt="search"
                style={{ width: 14, cursor: "pointer" }}
                onClick={() => handleSearch(key)}
            />
        </div>
    );

    const columns = [
        { key: "Supplier_ID", name: renderHeader("ID", "Supplier_ID") },
        { key: "name", name: renderHeader("Name", "name") },
        { key: "phone", name: renderHeader("Phone", "phone") },
        { key: "email", name: renderHeader("Email", "email") },
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
                        placeholder="555-890-1235"
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
                <DataGrid columns={columns} rows={suppliers} rowKeyGetter={row => row.Supplier_ID} />
            </div>
        </div>
    );
};
