// EmployeePage.jsx
import React, { useEffect, useState } from "react";
import { DataGrid } from "react-data-grid";
import axios from "axios";
import "./EmployeePage.css";

import counterIcon from "./assets/ic-arrow-drop-down0.svg";
import searchIcon  from "./assets/filter-svgrepo-com.svg";


export const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        new_Employee_ID: "",
        new_basic_salary: "",
        new_annual_bonus: "",
        new_Employee_name: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch & normalize
    const fetchAllEmployees = () => {
        axios
            .get("http://localhost:3001/api/employees")
            .then(res => {
                setEmployees(res.data);
            })
            .catch(err => console.error("Fetch failed:", err));
    };

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    // Form handlers
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // inside your EmployeePage component, alongside fetchAllEmployees:

    const handleSort = (column) => {
        axios
            .get("http://localhost:3001/api/sorter", {
                params: {
                    tbl: "Employee",
                    col: column,
                    op: "ASC" // toggle to DESC as needed
                }
            })
            .then(res => {
                setEmployees(res.data);
            })
            .catch(err => console.error("Sort failed:", err));
    };

    const handleSearch = (column) => {
        const value = prompt(`Enter value to search in ${column}`);
        if (!value) {
            // reset filter
            fetchAllEmployees();
            return;
        }

        axios
            .get("http://localhost:3001/api/search", {
                params: {
                    table: "Employee",
                    col: column,
                    val: value
                }
            })
            .then(res => {
                setEmployees(res.data);
            })
            .catch(err => console.error("Search failed:", err));
    };

    const resetForm = () => {
        setFormData({
            new_Employee_ID: "",
            new_basic_salary: "",
            new_annual_bonus: "",
            new_Employee_name: ""
        });
        setIsEditing(false);
        setMessage("");
    };

    const handleSave = () => {
        console.log("Submitting formData:", formData);
        axios.post("http://localhost:3001/api/employees/insert", formData)
            .then(() => axios.get("http://localhost:3001/api/employees"))
            .then(res => {
                setEmployees(res.data);
                setFormData({
                    new_Employee_ID: "",
                    new_basic_salary: "",
                    new_annual_bonus: "",
                    new_Employee_name: ""
                });
            })
            .catch(err => console.error("Insert failed:", err));
    };



    const handleUpdate = () => {
        // Prepare payload to match backend expectations
        const payload = {
            new_Employee_ID: formData.new_Employee_ID,
            new_basic_salary: formData.new_basic_salary,
            new_annual_bonus: formData.new_annual_bonus,
            new_Employee_name: formData.new_Employee_name
        };

        console.log("Submitting update payload:", payload);

        axios
            .put("http://localhost:3001/api/employees/update", payload)
            .then(() => {
                setMessage("Employee updated!");
                resetForm();
                fetchAllEmployees();
            })
            .catch(err => {
                const errorMessage = err.response?.data?.error || "Update failed.";
                console.error("Update failed:", errorMessage);
                setMessage(errorMessage);
            });
    };

    // Delete handler
    const handleDelete = id => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        axios
            .delete(`http://localhost:3001/api/employees/${id}`)
            .then(() => {
                setMessage("Employee deleted!");
                fetchAllEmployees();
            })
            .catch(() => setMessage("Delete failed."));
    };

    // Start editing row
    const startEdit = row => {
        setFormData({
            new_Employee_ID: row.Employee_ID,
            new_basic_salary: row.basic_salary,
            new_annual_bonus: row.annual_bonus,
            new_Employee_name: row.name
        });
        setIsEditing(true);
        setMessage("");
    };

    // Grid columns with both Edit & Delete
    const columns = [
        {
            key: "Employee_ID",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Employee ID
                    <img
                        src={counterIcon}
                        alt="sort"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSort("Employee_ID")}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSearch("Employee_ID")}
                    />
                </div>
            )
        },
        {
            key: "name",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Name
                    <img
                        src={counterIcon}
                        alt="sort"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSort("name")}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSearch("name")}
                    />
                </div>
            )
        },
        {
            key: "basic_salary",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Basic Salary
                    <img
                        src={counterIcon}
                        alt="sort"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSort("basic_salary")}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSearch("basic_salary")}
                    />
                </div>
            )
        },
        {
            key: "annual_bonus",
            name: (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Annual Bonus
                    <img
                        src={counterIcon}
                        alt="sort"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSort("annual_bonus")}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: 14, height: 14, cursor: "pointer" }}
                        onClick={() => handleSearch("annual_bonus")}
                    />
                </div>
            )
        },
        {
            key: "actions",
            name: "Action",
            renderCell: ({ row }) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => startEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.Employee_ID)}>Delete</button>
                </div>
            )
        }
    ];


    return (
        <div className="employee-page">
            {/* Add / Edit Form */}
            <div className="form container3">
                <h2>{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
                <label>
                    ID
                    <input
                        type="text"
                        name="new_Employee_ID"
                        value={formData.new_Employee_ID}
                        onChange={handleChange}
                        placeholder="Enter employee ID"
                    />
                </label>

                <label>
                    Name
                    <input
                        type="text"
                        name="new_Employee_name"
                        value={formData.new_Employee_name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                    />
                </label>

                <label>
                    Basic Salary (USD)
                    <input
                        name="new_basic_salary"
                        value={formData.new_basic_salary}
                        onChange={handleChange}
                        placeholder="Enter Basic Salary"
                    />
                </label>

                <label>
                    Annual Bonus (USD)
                    <input
                        name="new_annual_bonus"
                        value={formData.new_annual_bonus}
                        onChange={handleChange}
                        placeholder="Enter Annual Bonus"
                    />
                </label>

                <div className="buttons">
                    {isEditing ? (
                        <>
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={resetForm}>Cancel</button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                console.log("Button clicked. Editing:", isEditing);
                                handleSave();
                            }}
                        >Add Employee</button>
                    )}
                </div>

                {message && <div className="message">{message}</div>}
            </div>

            {/* Employee List */}
            <div className="container4" style={{ height: 400 }}>
                <DataGrid columns={columns} rows={employees} />
            </div>
        </div>
    );
};
