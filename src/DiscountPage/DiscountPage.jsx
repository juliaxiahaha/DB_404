import { jwtDecode } from 'jwt-decode';
import "./DiscountPage.css";
import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';
import counterIcon from './assets/ic-arrow-drop-down0.svg';
import searchIcon from './assets/filter-svgrepo-com.svg';


import { useEffect, useState } from "react";
import axios from "axios";

export const DiscountPage = ({ className, ...props }) => {
    const [discounts, setDiscounts] = useState([]);
    const [formData, setFormData] = useState({
        discount_type: "",
        discount_value: "",
        start_date: "",
        end_date: ""
    });

    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");
    console.log(token);
    let role = null;
    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (err) {
            console.error("Failed to decode token", err);
        }
    }
    const canAddDiscount = role === "Developer" || role === "Manager";
    const canModifyDiscounts = role === "Developer" || role === "Manager";

    const handleSort = (column) => {
        axios.get(`http://localhost:3001/api/sorter`, {
            params: {
                tbl: 'Discount',
                col: column,
                op: 'ASC' // or 'DESC', or track and toggle this if needed
            },
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setDiscounts(res.data))
            .catch(err => console.error("Sort failed:", err));
    };

    const fetchAllDiscounts = () => {
        axios.get("http://localhost:3001/discount/discounts", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setDiscounts(res.data))
            .catch(err => console.error("Fetch failed:", err));
    };

    const handleSearch = (column) => {
        const value = prompt(`Enter value to search in ${column}`);
        if (!value) {
            fetchAllDiscounts(); // reset filter
            return;
        }
        if (!value) return;

        axios.get('http://localhost:3001/api/search', {
            params: {
                table: 'Discount',
                col: column,
                val: value
            },
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setDiscounts(res.data))
            .catch(err => console.error('Search failed:', err));
    };



    useEffect(() => {
        fetchAllDiscounts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddDiscount = () => {
        axios.post("http://localhost:3001/discount/", formData)
            .then(() => axios.get("http://localhost:3001/discount/discounts", { headers: { Authorization: `Bearer ${token}` } }))
            .then(res => {
                setDiscounts(res.data);
                setMessage("Discount added successfully!");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => console.error("Insert failed:", err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/discount/${id}`)
            .then(() => setDiscounts(discounts.filter(d => d.Discount_ID !== id)))
            .catch(err => console.error("Delete failed:", err));
    };

    const handleUpdate = (discount) => {
        const updatedType = prompt("Enter new discount type:", discount.discount_type);
        const updatedValue = prompt("Enter new discount value:", discount.discount_value);
        const updatedStartDate = prompt("Enter new start date (YYYY-MM-DD):", discount.start_date?.slice(0, 10));
        const updatedEndDate = prompt("Enter new end date (YYYY-MM-DD):", discount.end_date?.slice(0, 10));
        if (updatedType && updatedValue && updatedStartDate && updatedEndDate) {
            axios.put(`http://localhost:3001/discount/${discount.Discount_ID}`, {
                discount_type: updatedType,
                discount_value: updatedValue,
                start_date: updatedStartDate,
                end_date: updatedEndDate
            })
                .then(() => axios.get("http://localhost:3001/discount/discounts", { headers: { Authorization: `Bearer ${token}` } }))
                .then(res => setDiscounts(res.data))
                .catch(err => console.error("Update failed:", err));
        }
    };


    const columns = [
        { key: 'Discount_ID',
            name: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Discount ID
                    <img
                        src={counterIcon}
                        alt="sort icon"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSort('Discount_ID')}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSearch('Discount_ID')}
                    />
                </div>
            ) },
        { key: 'discount_type',
            name: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Type
                    <img
                        src={counterIcon}
                        alt="sort icon"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSort('discount_type')}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSearch('discount_type')}
                    />
                </div>
            ) },
        { key: 'discount_value',
            name: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Value
                    <img
                        src={counterIcon}
                        alt="sort icon"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSort('discount_value')}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSearch('discount_value')}
                    />
                </div>
            ),
            renderCell: ({ row }) => `${row.discount_value}%`
        },
        {
            key: 'start_date',
            name: (
                <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    Start Date
                    <img
                        src={counterIcon}
                        alt="sort icon"
                        style={{width: '14px', height: '14px', cursor: 'pointer'}}
                        onClick={() => handleSort('start_date')}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSearch('start_date')}
                    />
                </div>
            ),
            renderCell: ({ row }) => row.start_date?.slice(0, 10)
        },
        {
            key: 'end_date',
            name: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    End Date
                    <img
                        src={counterIcon}
                        alt="sort icon"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSort('end_date')}
                    />
                    <img
                        src={searchIcon}
                        alt="search"
                        style={{ width: '14px', height: '14px', cursor: 'pointer' }}
                        onClick={() => handleSearch('end_date')}
                    />
                </div>
            ),
            renderCell: ({ row }) => row.end_date?.slice(0, 10)
        },

        {
            key: 'actions',
            name: 'Action',
            renderCell: ({ row }) => (
                canModifyDiscounts ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleUpdate(row)}>Edit</button>
                        <button onClick={() => handleDelete(row.Discount_ID)}>Delete</button>
                    </div>
                ) : (
                    <div>No Action</div>
                )
            )
        }
    ];


    return (
        <div className={"discount-page " + className}>
            {canAddDiscount && (
                <div className="container">
                    <div className="title2">Add Discount </div>
                    <div className="description">Fill in the details below </div>
                </div>
            )}
            {message && <div className="message-success">{message}</div>}

            {canAddDiscount && (
                <div className="form-container">
                    <div className="list">
                        <div className="row">
                            <div className="input">
                                <div className="title3">Discount Type </div>
                                <div className="textfield2">
                                    <input
                                        type="text"
                                        name="discount_type"
                                        placeholder="E.g. Percentage or Fixed Amount"
                                        value={formData.discount_type}
                                        onChange={handleInputChange}
                                        className="text2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input">
                                <div className="title3">Discount Value </div>
                                <div className="textfield2">
                                    <input
                                        type="text"
                                        name="discount_value"
                                        placeholder="Enter the value"
                                        value={formData.discount_value}
                                        onChange={handleInputChange}
                                        className="text2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input">
                                <div className="title3">Start Date </div>
                                <div className="textfield2">
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={formData.start_date}
                                        onChange={handleInputChange}
                                        className="text2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input">
                                <div className="title3">End Date </div>
                                <div className="textfield2">
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date}
                                        onChange={handleInputChange}
                                        className="text2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <button className="seconday title4" type="button">Cancel</button>
                        <button className="primary title5" type="button" onClick={handleAddDiscount}>Add Discount</button>
                    </div>
                </div>
            )}
            <div className="section">
                <div className="container2">
                    <div className="title6">Contact Us: buyaozhaowomen@store.com </div>
                    <div className="title7">Copyright © 2025 Store Management </div>
                </div>
            </div>
            <div className="container3">
                <div className="title8">Discount List </div>
            </div>
            <div className="data-grid-container" style={{ marginTop: '2rem', width: '100%' }}>
                <DataGrid columns={columns} rows={discounts} style={{ height: 400 }} />
            </div>

        </div>

    );
};
