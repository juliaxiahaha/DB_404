// EmployeePage.jsx
import 'react-data-grid/lib/styles.css';
import React, { useEffect, useState } from 'react';
import { DataGrid } from 'react-data-grid';
import axios from 'axios';
import counterIcon from './assets/ic-arrow-drop-down0.svg';
import searchIcon from './assets/filter-svgrepo-com.svg';
import './EmployeePage.css';

export const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        new_Employee_ID: '',
        new_Employee_name: '',
        new_basic_salary: '',
        new_annual_bonus: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    // Generate a simple 4-digit ID, like the OrderPage
    const generateEmployeeId = () => Math.floor(1000 + Math.random() * 9000);

    // Fetch & normalize
    const fetchAllEmployees = () => {
        axios
            .get('http://localhost:3001/api/employees')
            .then(res => setEmployees(res.data))
            .catch(err => console.error('Fetch failed:', err));
    };

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    // Handlers
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            new_Employee_ID: '',
            new_Employee_name: '',
            new_basic_salary: '',
            new_annual_bonus: ''
        });
        setIsEditing(false);
        setMessage('');
    };

    const handleSave = () => {
        const generatedId = generateEmployeeId();
        const payload = {
            new_Employee_ID: generatedId,
            new_Employee_name: formData.new_Employee_name,
            new_basic_salary: formData.new_basic_salary,
            new_annual_bonus: formData.new_annual_bonus
        };

        axios
            .post('http://localhost:3001/api/employees/insert', payload, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(() => {
                fetchAllEmployees();
                resetForm();
                setMessage(`Added Employee ID ${generatedId}`);
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(err => {
                console.error('Insert failed:', err);
                setMessage('Insert failed.');
                setTimeout(() => setMessage(''), 3000);
            });
    };

    const handleUpdate = () => {
        const payload = {
            new_Employee_ID: formData.new_Employee_ID,
            new_Employee_name: formData.new_Employee_name,
            new_basic_salary: formData.new_basic_salary,
            new_annual_bonus: formData.new_annual_bonus
        };

        axios
            .put('http://localhost:3001/api/employees/update', payload)
            .then(() => {
                setMessage('Employee updated!');
                fetchAllEmployees();
                resetForm();
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(err => {
                console.error('Update failed:', err);
                setMessage('Update failed.');
                setTimeout(() => setMessage(''), 3000);
            });
    };

    const handleDelete = id => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        axios
            .delete(`http://localhost:3001/api/employees/${id}`)
            .then(() => {
                setMessage('Employee deleted!');
                fetchAllEmployees();
                setTimeout(() => setMessage(''), 3000);
            })
            .catch(() => {
                console.error('Delete failed');
                setMessage('Delete failed.');
                setTimeout(() => setMessage(''), 3000);
            });
    };

    const startEdit = row => {
        setFormData({
            new_Employee_ID: row.Employee_ID,
            new_Employee_name: row.name,
            new_basic_salary: row.basic_salary,
            new_annual_bonus: row.annual_bonus
        });
        setIsEditing(true);
        setMessage('');
    };

    const handleSort = column => {
        axios
            .get('http://localhost:3001/api/sorter', {
                params: { tbl: 'Employee', col: column, op: 'ASC' }
            })
            .then(res => setEmployees(res.data))
            .catch(err => console.error('Sort failed:', err));
    };

    const handleSearch = column => {
        const value = prompt(`Enter value to search in ${column}`);
        if (!value) return fetchAllEmployees();
        axios
            .get('http://localhost:3001/api/search', {
                params: { table: 'Employee', col: column, val: value }
            })
            .then(res => setEmployees(res.data))
            .catch(err => console.error('Search failed:', err));
    };

    const renderHeader = (label, key) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {label}
            <img
                src={counterIcon}
                alt="sort"
                style={{ width: 14, cursor: 'pointer' }}
                onClick={() => handleSort(key)}
            />
            <img
                src={searchIcon}
                alt="search"
                style={{ width: 14, cursor: 'pointer' }}
                onClick={() => handleSearch(key)}
            />
        </div>
    );

    const columns = [
        {
            key: 'Employee_ID',
            name: renderHeader('Employee ID', 'Employee_ID')
        },
        {
            key: 'name',
            name: renderHeader('Name', 'name')
        },
        {
            key: 'basic_salary',
            name: renderHeader('Basic Salary', 'basic_salary')
        },
        {
            key: 'annual_bonus',
            name: renderHeader('Annual Bonus', 'annual_bonus')
        },
        {
            key: 'actions',
            name: 'Action',
            renderCell: ({ row }) => (
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => startEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.Employee_ID)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <div className="employee-page">
            <div className="form container3">
                <h2>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h2>

                {isEditing && (
                    <label>
                        ID
                        <input
                            type="text"
                            name="new_Employee_ID"
                            value={formData.new_Employee_ID}
                            disabled
                        />
                    </label>
                )}

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
                        type="text"
                        name="new_basic_salary"
                        value={formData.new_basic_salary}
                        onChange={handleChange}
                        placeholder="Enter Basic Salary"
                    />
                </label>

                <label>
                    Annual Bonus (USD)
                    <input
                        type="text"
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
                        <button onClick={handleSave}>Add Employee</button>
                    )}
                </div>

                {message && <div className="message">{message}</div>}
            </div>

            <div className="container4" style={{ height: 400 }}>
                <DataGrid columns={columns} rows={employees} rowKeyGetter={row => row.Employee_ID} />
            </div>
        </div>
    );
};
