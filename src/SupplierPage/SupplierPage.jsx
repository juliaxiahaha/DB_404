import "./SupplierPage.css";

import React from "react";
import vector2000 from "/src/SupplierPage/assets/vector-2000.svg";
import vector2001 from "/src/SupplierPage/assets/vector-2001.svg";
import vector2002 from "/src/SupplierPage/assets/vector-2002.svg";
import vector2003 from "/src/SupplierPage/assets/vector-2003.svg";
import vector2004 from "/src/SupplierPage/assets/vector-2004.svg";
import image70 from "/src/SupplierPage/assets/image-70.png";
import image80 from "/src/SupplierPage/assets/image-80.png";

export const SupplierPage = ({ className, ...props }) => {
  return (
      <div className={`supplier-page ${className}`} {...props}>
        <div className="section">
          <div className="container">
            <div className="title">Contact Us: buyaozhaowomen@store.com</div>
            <div className="title2">Copyright © 2025 Store Management</div>
          </div>
        </div>
        <div className="page">
          <div className="section2">
            <div className="container2">
              <div className="title3">Manage Product Suppliers</div>
              <div className="description">
                View and update supplier information
              </div>
              <div className="button">
                <div className="primary">
                  <div className="title4">Add Supplier</div>
                </div>
              </div>
            </div>
            <img className="vector-200" src={vector2000} alt="decorative vector" />
          </div>
          <div className="list">
            <div className="container3">
              <div className="title5">Supplier List</div>
            </div>
            <div className="image-4"></div>
            <div className="list2">
              <div className="row">
                <div className="item">
                  <img className="image-8" src={image80} alt="supplier example" />
                  <div className="frame-427318906">
                    <div className="title6">Supplier_ID1</div>
                    <div className="subtitle">Phone: 4006 700 700</div>
                  </div>
                  <div className="subtitle2">meiyouzhaodao@tencent.com</div>
                  <img className="vector-2002" src={vector2001} alt="action icon" />
                </div>
              </div>
              <div className="row2">
                <div className="item2">
                  <img className="image-7" src={image70} alt="supplier example" />
                  <div className="frame-427318906">
                    <div className="title7">Supplier_ID2</div>
                    <div className="subtitle">Phone: 4006 666 312</div>
                  </div>
                  <div className="subtitle3">BD@mihoyo.com</div>
                  <img className="vector-2003" src={vector2002} alt="action icon" />
                </div>
              </div>
            </div>
            <img className="vector-2004" src={vector2003} alt="decorative vector" />
          </div>
          <div className="form">
            <div className="container4">
              <div className="title8">Add New Supplier</div>
            </div>
            <div className="list3">
              <div className="row3">
                <div className="input">
                  <div className="title9">Supplier Name</div>
                  <div className="textfield">
                    <div className="text">Enter supplier name</div>
                  </div>
                </div>
                <div className="input">
                  <div className="title9">Supplier Phone</div>
                  <div className="textfield">
                    <div className="text">Enter supplier phone</div>
                  </div>
                </div>
              </div>
              <div className="row3">
                <div className="input">
                  <div className="title9">Supplier Email</div>
                  <div className="textfield">
                    <div className="text">Enter supplier email</div>
                  </div>
                </div>
              </div>
              <div className="button">
                <div className="primary">
                  <div className="title4">Save Supplier</div>
                </div>
              </div>
            </div>
            <img className="vector-2005" src={vector2004} alt="decorative vector" />
          </div>
        </div>
      </div>
  );
};
