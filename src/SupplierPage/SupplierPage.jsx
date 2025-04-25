import "./SupplierPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';
import counterIcon from './assets/ic-arrow-drop-down0.svg';
import searchIcon from './assets/filter-svgrepo-com.svg';

export const SupplierPage = ({ className, ...props }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  const fetchAllSuppliers = () => {
    axios.get("http://localhost:3001/api/suppliers")
        .then(res => setSuppliers(res.data))
        .catch(err => console.error("Fetch failed:", err));
  };

  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSupplier = () => {
    axios.post("http://localhost:3001/api/suppliers/insert", formData)
        .then(() => fetchAllSuppliers())
        .then(() => {
          setMessage("Supplier added successfully!");
          setTimeout(() => setMessage(""), 3000);
          setFormData({ name: '', phone: '', email: '' });
        })
        .catch(err => console.error("Insert failed:", err));
  };

  const handleSort = (column) => {
    axios.get(`http://localhost:3001/api/sorter`, {
      params: {
        tbl: 'Supplier',
        col: column,
        op: 'ASC'
      }
    })
        .then(res => setSuppliers(res.data))
        .catch(err => console.error("Sort failed:", err));
  };

  const handleSearch = (column) => {
    const value = prompt(`Enter value to search in ${column}`);
    if (!value) return fetchAllSuppliers();

    axios.get('http://localhost:3001/api/search', {
      params: { table: 'Supplier', col: column, val: value }
    })
        .then(res => setSuppliers(res.data))
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
    { key: 'Supplier_ID', name: renderHeader('Supplier ID', 'Supplier_ID') },
    { key: 'name', name: renderHeader('Name', 'name') },
    { key: 'phone', name: renderHeader('Phone', 'phone') },
    { key: 'email', name: renderHeader('Email', 'email') }
  ];

  return (
      <div className={`supplier-page ${className}`} {...props}>
        <div className="container-header">
          <h2 className="title">Manage Product Suppliers</h2>
          <p className="description">View and update supplier information</p>
          <button className="add-button">Add Supplier</button>
        </div>

        {message && <div className="message-success">{message}</div>}

        <div className="container-sub">
          <h3 className="title-sub">Supplier List</h3>
          <div className="data-grid-container">
            <DataGrid columns={columns} rows={suppliers} style={{ height: 300 }} />
          </div>
        </div>

        <div className="form-container">
          <h3 className="title-sub">Add New Supplier</h3>
          <div className="form-row">
            <div className="input-group">
              <label>Supplier Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter supplier name" />
            </div>
            <div className="input-group">
              <label>Supplier Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter supplier phone" />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group full-width">
              <label>Supplier Email</label>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter supplier email" />
            </div>
          </div>
          <div className="form-actions">
            <button className="submit-button" onClick={handleAddSupplier}>Save Supplier</button>
          </div>
        </div>

        <div className="footer">
          <span>Contact Us: buyaozhaowomen@store.com</span>
          <span>Copyright © 2025 Store Management</span>
        </div>
      </div>
  );
};
