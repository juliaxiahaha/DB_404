import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import counterIcon from './assets/ic-arrow-drop-down0.svg';
import searchIcon from './assets/filter-svgrepo-com.svg';
import './OrderPage.css';

export const OrderPage = ({ className, ...props }) => {
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        new_order_date: '',
        new_total_price: '',
        new_Customer_ID: '',
        new_Employee_ID: '',
        new_Shipping_ID: ''
    });
    const [message, setMessage] = useState('');

    const normalizeOrders = (data) =>
        data.map(order => ({
            ...order,
            total_price: typeof order.total_price === 'number' ? `$${order.total_price.toFixed(2)}` : order.total_price
        }));

    const fetchAllOrders = () => {
        axios.get('http://localhost:3001/api/orders')
            .then(res => setOrders(normalizeOrders(res.data)))
            .catch(err => console.error("Fetch failed:", err));
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleSort = (column) => {
        axios.get(`http://localhost:3001/api/sorter`, {
            params: { tbl: 'Orders', col: column, op: 'ASC' }
        })
            .then(res => setOrders(normalizeOrders(res.data)))
            .catch(err => console.error("Sort failed:", err));
    };

    const handleSearch = (column) => {
        const value = prompt(`Enter value to search in ${column}`);
        if (!value) return fetchAllOrders();

        axios.get('http://localhost:3001/api/search', {
            params: { table: 'Orders', col: column, val: value }
        })
            .then(res => setOrders(normalizeOrders(res.data)))
            .catch(err => console.error('Search failed:', err));
    };

    const renderHeader = (label, columnKey) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {label}
            <img src={counterIcon} onClick={() => handleSort(columnKey)} alt="sort" style={{ width: '14px', cursor: 'pointer' }} />
            <img src={searchIcon} onClick={() => handleSearch(columnKey)} alt="search" style={{ width: '14px', cursor: 'pointer' }} />
        </div>
    );

    const columns = [
        { key: 'Order_ID', name: renderHeader('Order ID', 'Order_ID') },
        { key: 'order_date', name: renderHeader('Date', 'order_date') },
        { key: 'total_price', name: renderHeader('Total Price', 'total_price') },
        { key: 'Customer_ID', name: renderHeader('Customer ID', 'Customer_ID') },
        { key: 'Employee_ID', name: renderHeader('Employee ID', 'Employee_ID') },
        { key: 'Shipping_ID', name: renderHeader('Shipping ID', 'Shipping_ID') },
        {
            key: 'actions',
            name: 'Action',
            renderCell: ({ row }) => (
                <div className="action-cell">
                    <button className="action-button">•••</button>
                    <button onClick={() => handleDelete(row.Order_ID)} className="delete-button">Delete</button>
                </div>
            )
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOrder = () => {
        const generatedOrderId = Math.floor(1000 + Math.random() * 9000);

        axios.post('http://localhost:3001/api/orders/insert', {
            new_Order_ID: generatedOrderId,
            new_order_date: formData.new_order_date,
            new_total_price: parseFloat(formData.new_total_price),
            new_Customer_ID: parseInt(formData.new_Customer_ID, 10),
            new_Employee_ID: parseInt(formData.new_Employee_ID, 10),
            new_Shipping_ID: parseInt(formData.new_Shipping_ID, 10)
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log('Insert success:', res.data);
                fetchAllOrders();
                setMessage("Order created successfully!");
                setTimeout(() => setMessage(""), 3000);
                setFormData({
                    new_order_date: '',
                    new_total_price: '',
                    new_Customer_ID: '',
                    new_Employee_ID: '',
                    new_Shipping_ID: ''
                });
            })
            .catch(err => {
                console.error("Insert failed:", err);
                setMessage("Insert failed!");
                setTimeout(() => setMessage(""), 3000);
            });
    };



    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/api/orders/${id}`)
            .then(() => fetchAllOrders())
            .catch(err => console.error("Delete failed:", err));
    };

    return (
        <div className={"order-page " + className}>
            <h1 className="order-title">Order List</h1>

            {message && <div className="message-success">{message}</div>}

            <div className="form-container">
                <div className="list">
                    <div className="row"><label>Date <input type="date" name="new_order_date" value={formData.new_order_date} onChange={handleInputChange} /></label></div>
                    <div className="row"><label>Total Price <input type="text" name="new_total_price" value={formData.new_total_price} onChange={handleInputChange} /></label></div>
                    <div className="row"><label>Customer ID <input type="number" name="new_Customer_ID" value={formData.new_Customer_ID} onChange={handleInputChange} /></label></div>
                    <div className="row"><label>Employee ID <input type="number" name="new_Employee_ID" value={formData.new_Employee_ID} onChange={handleInputChange} /></label></div>
                    <div className="row"><label>Shipping ID <input type="number" name="new_Shipping_ID" value={formData.new_Shipping_ID} onChange={handleInputChange} /></label></div>
                </div>
                <div className="button">
                    <button className="seconday title4" type="button">Cancel</button>
                    <button className="primary title5" type="button" onClick={handleAddOrder}>Add Order</button>
                </div>
            </div>

            <div className="data-grid-container" style={{ marginTop: '2rem', width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={orders}
                    rowKeyGetter={row => row.Order_ID}
                    style={{ height: 500 }}
                />
            </div>

            <div className="footer">
                <span>Contact Us: buyaozhaowomen@store.com</span>
                <span>Copyright © 2025 Store Management</span>
            </div>
        </div>
    );
};
