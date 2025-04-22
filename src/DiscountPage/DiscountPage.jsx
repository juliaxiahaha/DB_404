import "./DiscountPage.css";
import {
    TableTopTypeIcon,
    TableTopTypeSearch,
    TableTopTypeDroplist,
    TableCellsTypeCheckbox,
    TableCellsTypeText,
    TableCellsTypeTag,
    TableCellsCurre,
    TableCellsTypeAction,
    TableCellsTypeSearch,
} from "../TableParts"

import background0 from './assets/background0.svg';
import background1 from './assets/background1.svg';
import baseBgDefault0 from './assets/base-bg-default0.svg';
import baseBgSelect0 from './assets/base-bg-select0.svg';
import counter0 from './assets/counter0.svg';
import icArrowDropDown0 from './assets/ic-arrow-drop-down0.svg';
import icSearch0 from './assets/ic-search0.svg';

import icons8BackFilled0 from './assets/icons-8-back-filled0.svg';
import icons8More0 from './assets/icons-8-more0.svg';
import icons8Right0 from './assets/icons-8-right0.svg';
import rectangle0 from './assets/rectangle0.svg';
import rectangle1 from './assets/rectangle1.svg';

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

    useEffect(() => {
        axios.get("http://localhost:3001/discount/discounts")
            .then(res => setDiscounts(res.data))
            .catch(err => console.error("Fetch failed:", err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddDiscount = () => {
        axios.post("http://localhost:3001/discount/", formData)
            .then(() => axios.get("http://localhost:3001/discount/discounts"))
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
        const newValue = prompt("Enter new discount value:", discount.discount_value);
        if (newValue !== null) {
            axios.put(`http://localhost:3001/discount/${discount.Discount_ID}`, {
                ...discount,
                discount_value: newValue
            })
                .then(() => axios.get("http://localhost:3001/discount/discounts"))
                .then(res => setDiscounts(res.data))
                .catch(err => console.error("Update failed:", err));
        }
    };

    return (
        <div className={"discount-page " + className}>
            <div className="container">
                <div className="title2">Add Discount </div>
                <div className="description">Fill in the details below </div>
            </div>
            {message && <div className="message-success">{message}</div>}
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
            <div className="section">
                <div className="container2">
                    <div className="title6">Contact Us: buyaozhaowomen@store.com </div>
                    <div className="title7">Copyright © 2025 Store Management </div>
                </div>
            </div>
            <div className="container3">
                <div className="title8">Discount List </div>
            </div>
            {/* Mapped table UI using TableParts components */}
            <div className="discount-table" style={{ width: "100%", marginBottom: "2rem" }}>
                <div className="table-header-row" style={{ display: "flex", alignItems: "center" }}>
                    <TableTopTypeIcon type="icon" className="table-top-instance" />
                    <TableTopTypeSearch text="Discount ID" className="table-top-instance2" />
                    <TableTopTypeSearch text="Start date" className="table-top-instance3" />
                    <TableTopTypeSearch text="End date" className="table-top-instance4" />
                    <TableTopTypeSearch text="Action" className="table-top-instance5" />
                    <TableTopTypeSearch text="Value" className="table-top-instance6" />
                    <TableTopTypeDroplist type="droplist" text="Type" text2="All" className="table-top-instance7" />
                </div>
                {discounts.map(discount => (
                    <div className="table-row" key={discount.Discount_ID} style={{ display: "flex", alignItems: "center" }}>
                        <TableCellsTypeCheckbox type="checkbox" className="table-cells-instance" />
                        <TableCellsTypeText
                            type="text"
                            text={discount.Discount_ID.toString()}
                            className="table-cells-instance2"
                        />
                        <TableCellsCurre
                            text={discount.discount_type}
                            className="table-cells-curre-instance"
                        />
                        <TableCellsTypeText
                            type="text"
                            text={discount.discount_value.toString()}
                            className="table-cells-instance23"
                        />
                        <TableCellsTypeTag
                            type="tag"
                            text={discount.start_date}
                            className="table-cells-instance3"
                        />
                        <TableCellsTypeTag
                            type="tag"
                            text={discount.end_date}
                            className="table-cells-instance4"
                        />
                        <TableCellsTypeAction className="table-cells-instance5">
                            <button onClick={() => handleUpdate(discount)}>Edit</button>
                            <button onClick={() => handleDelete(discount.Discount_ID)}>Delete</button>
                        </TableCellsTypeAction>
                    </div>
                ))}
            </div>
            {/* The rest of your original static table and UI below can be kept or removed as appropriate */}
            {/* ... */}
        </div>
    );
};
