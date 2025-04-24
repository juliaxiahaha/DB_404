import "./SupplierPage.css";
import 'react-data-grid/lib/styles.css';
import { DataGrid } from 'react-data-grid';
import { useEffect, useState } from "react";
import axios from "axios";
import counterIcon from './assets/ic-arrow-drop-down0.svg';
import searchIcon from './assets/filter-svgrepo-com.svg';

export const SupplierPage = ({ className, ...props }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [message, setMessage] = useState("");

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
    axios.post("http://localhost:3001/api/suppliers", formData)
        .then(() => fetchAllSuppliers())
        .then(() => {
          setMessage("Supplier added successfully!");
          setTimeout(() => setMessage(""), 3000);
        })
        .catch(err => console.error("Insert failed:", err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/suppliers/${id}`)
        .then(() => setSuppliers(suppliers.filter(s => s.Supplier_ID !== id)))
        .catch(err => console.error("Delete failed:", err));
  };

  const handleUpdate = (supplier) => {
    const newName = prompt("Enter new supplier name:", supplier.name);
    const newPhone = prompt("Enter new phone:", supplier.phone);
    const newEmail = prompt("Enter new email:", supplier.email);
    if (newName && newPhone && newEmail) {
      axios.put(`http://localhost:3001/api/suppliers/${supplier.Supplier_ID}`, {
        name: newName,
        phone: newPhone,
        email: newEmail
      })
          .then(() => fetchAllSuppliers())
          .catch(err => console.error("Update failed:", err));
    }
  };

  const columns = [
    { key: 'Supplier_ID',
      name: (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            ID
            <img
                src={counterIcon}
                alt="sort"
                style={{ width: '14px', cursor: 'pointer' }}
                onClick={() => {/* implement sort if needed */}}
            />
            <img
                src={searchIcon}
                alt="search"
                style={{ width: '14px', cursor: 'pointer' }}
                onClick={() => {/* implement search if needed */}}
            />
          </div>
      ) },
    { key: 'name', name: 'Name' },
    { key: 'phone', name: 'Phone' },
    { key: 'email', name: 'Email' },
    {
      key: 'actions',
      name: 'Action',
      renderCell: ({ row }) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => handleUpdate(row)}>Edit</button>
            <button onClick={() => handleDelete(row.Supplier_ID)}>Delete</button>
          </div>
      )
    }
  ];

  return (
      <div className={`supplier-page ${className}`} {...props}>
        <div className="container">
          <div className="title2">Add Supplier</div>
          <div className="description">Fill in the details below</div>
        </div>
        {message && <div className="message-success">{message}</div>}

        <div className="form-container">
          <div className="input">
            <div className="title3">Supplier Name</div>
            <input
                type="text"
                name="name"
                placeholder="Enter supplier name"
                value={formData.name}
                onChange={handleInputChange}
                className="text2"
            />
          </div>
          <div className="input">
            <div className="title3">Supplier Phone</div>
            <input
                type="text"
                name="phone"
                placeholder="Enter supplier phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="text2"
            />
          </div>
          <div className="input">
            <div className="title3">Supplier Email</div>
            <input
                type="email"
                name="email"
                placeholder="Enter supplier email"
                value={formData.email}
                onChange={handleInputChange}
                className="text2"
            />
          </div>
          <div className="button">
            <button className="primary title4" type="button" onClick={handleAddSupplier}>
              Save Supplier
            </button>
          </div>
        </div>

        <div className="container3">
          <div className="title5">Supplier List</div>
        </div>
        <div className="data-grid-container" style={{ marginTop: '2rem', width: '100%' }}>
          <DataGrid columns={columns} rows={suppliers} style={{ height: 400 }} />
        </div>

        <div className="section">
          <div className="container2">
            <div className="title">Contact Us: buyaozhaowomen@store.com</div>
            <div className="title2">Copyright © 2025 Store Management</div>
          </div>
        </div>
      </div>
  );
};
