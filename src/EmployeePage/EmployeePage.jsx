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
        employee_id: "",
        name: "",
        basic_salary: "",
        annual_bonus: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch & normalize
    const fetchAllEmployees = () => {
        axios
            .get("http://localhost:3001/api/employees")
            .then(res => {
                const normalized = res.data.map(emp => ({
                    employee_id: emp.Employee_ID,
                    name:         emp.name,
                    basic_salary: emp.basic_salary,
                    annual_bonus: emp.annual_bonus
                }));
                setEmployees(normalized);
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
                // normalize backend keys into { employee_id, name, basic_salary, annual_bonus }
                const normalized = res.data.map(emp => ({
                    employee_id: emp.Employee_ID,
                    name:         emp.name,
                    basic_salary: emp.basic_salary,
                    annual_bonus: emp.annual_bonus
                }));
                setEmployees(normalized);
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
                const normalized = res.data.map(emp => ({
                    employee_id: emp.Employee_ID,
                    name:         emp.name,
                    basic_salary: emp.basic_salary,
                    annual_bonus: emp.annual_bonus
                }));
                setEmployees(normalized);
            })
            .catch(err => console.error("Search failed:", err));
    };

    const resetForm = () => {
        setFormData({
            employee_id: "",
            name: "",
            basic_salary: "",
            annual_bonus: ""
        });
        setIsEditing(false);
        setMessage("");
    };

    const handleSave = () => {
        axios
            .post("http://localhost:3001/api/employees/insert", formData)
            .then(() =>
                // immediately fetch updated list
                axios.get("http://localhost:3001/api/employees")
            )
            .then(res => {
                // normalize the response
                const normalized = res.data.map(emp => ({
                    employee_id: emp.Employee_ID,
                    basic_salary: emp.basic_salary,
                    annual_bonus: emp.annual_bonus,
                    name:         emp.name,
                }));
                setEmployees(normalized);

                setMessage("Employee added successfully!");
                setTimeout(() => setMessage(""), 3000);
                resetForm();
            })
            .catch(err => {
                console.error("Insert failed:", err.response ?? err);
                setMessage("Add failed.");
                setTimeout(() => setMessage(""), 3000);
            });
    };



    const handleUpdate = () => {
        axios
            .put(
                `http://localhost:3001/api/employees/${formData.employee_id}`,
                formData
            )
            .then(() => {
                setMessage("Employee updated!");
                resetForm();
                fetchAllEmployees();
            })
            .catch(() => setMessage("Update failed."));
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
            employee_id: row.employee_id,
            name:         row.name,
            basic_salary: row.basic_salary,
            annual_bonus: row.annual_bonus
        });
        setIsEditing(true);
        setMessage("");
    };

    // Grid columns with both Edit & Delete
    const columns = [
        {
            key: "employee_id",
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
                    <button onClick={() => handleDelete(row.employee_id)}>Delete</button>
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
                    Employee ID
                    <input
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleChange}
                        disabled={isEditing}
                        placeholder="Enter Employee ID"
                    />
                </label>

                <label>
                    Name
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                    />
                </label>

                <label>
                    Basic Salary (USD)
                    <input
                        name="basic_salary"
                        type="number"
                        value={formData.basic_salary}
                        onChange={handleChange}
                        placeholder="Enter Basic Salary"
                    />
                </label>

                <label>
                    Annual Bonus (USD)
                    <input
                        name="annual_bonus"
                        type="number"
                        value={formData.annual_bonus}
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
                        <button onClick={handleSave}>Add Employee</button>
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
