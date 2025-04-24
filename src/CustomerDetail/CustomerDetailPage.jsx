import "./CustomerDetailPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const CustomerDetailPage = ({ className, ...props }) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/customers/${id}`)
      .then((res) => {
        console.log("Customer detail fetched:", res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch customer:", err);
      });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/orders")
      .then(res => {
        const customerOrders = res.data.filter(order => order.Customer_ID === parseInt(id));
        setOrders(customerOrders.slice(-2).reverse());
      })
      .catch(err => console.error("Failed to fetch orders:", err));
  }, [id]);

useEffect(() => {
    console.log("Fetching shopping cart for customer ID:", id);
    axios.get(`http://localhost:3001/api/shoppingCarts/${id}`)
      .then(async (res) => {
        console.log("Raw shopping cart data:", res.data);
        const enriched = await Promise.all(res.data.map(async (item) => {
          try {
            const product = await axios.get(`http://localhost:3001/api/products/${item.Product_ID}`);
            console.log(`Fetched product name for Product_ID ${item.Product_ID}:`, product.data.name);
            return {
              ...item,
              product_name: product.data.name
            };
          } catch (err) {
            console.error(`Failed to fetch product for Product_ID ${item.Product_ID}`, err);
            return {
              ...item,
              product_name: "Unknown"
            };
          }
        }));
        setCartItems(enriched);
      })
      .catch((err) => {
        console.error("Failed to fetch shopping cart by customer ID:", err);
      });
  }, [id]);

  const handleSave = () => {
    axios.put("http://localhost:3001/api/customers/update", {
      new_Customer_ID: customer.Customer_ID,
      new_name: customer.name,
      new_address: customer.address,
      new_phone: customer.phone,
      new_email: customer.email,
      new_membership_registration_date: customer.registration_date?.slice(0, 10)
    })
    .then(res => alert(res.data.message))
    .catch(err => {
      console.error("Update failed:", err);
      alert("Update failed.");
    });
  };

  return (
    <div className={"customer-detail-page " + (className || "")}>
      <div className="section">
        <div className="container">
          <div className="title">Contact Us: buyaozhaowomen@store.com </div>
          <div className="title2">Copyright © 2025 Store Management </div>
        </div>
      </div>
      <div className="section2">
        <div className="avatar">
          <img className="image-1" src="image-10.png" />
          <img className="image-2" src="image-20.png" />
          <img className="image-3" src="image-30.png" />
        </div>
        <div className="container2">
          <div className="title3">{customer?.name} </div>
          <div className="selection">
            <div className="label-normal">
              <div className="label-text">Gold Member </div>
            </div>
          </div>
          <div className="description">
            Welcome to our shop! Enjoy your exclusive benefits.{" "}
          </div>
        </div>
        <img className="vector-200" src="vector-2000.svg" />
      </div>
      <div className="form">
        <div className="container3">
          <div className="title4">Update Details </div>
          <div className="description2">
            Please ensure your information is up to date.{" "}
          </div>
        </div>
        <div className="list">
          <div className="row">
            <div className="input">
              <div className="title5">Name </div>
              <div className="textfield">
                <input className="text" value={customer?.name || ''} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              </div>
            </div>
            <div className="input">
              <div className="title5">Address </div>
              <div className="textfield">
                <input className="text" value={customer?.address || ''} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="title5">Phone </div>
              <div className="textfield">
                <input className="text" value={customer?.phone || ''} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              </div>
            </div>
            <div className="input">
              <div className="title5">Email </div>
              <div className="textfield">
                <input className="text" value={customer?.email || ''} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="title5">Membership Registration Date </div>
              <div className="textfield">
                <input
                  className="text"
                  type="date"
                  value={
                    customer?.registration_date
                      ? new Date(customer.registration_date).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) => setCustomer({ ...customer, registration_date: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="button">
            <div className="primary" onClick={handleSave}>
              <div className="title6">Save Changes</div>
            </div>
          </div>
        </div>
        <img className="vector-2002" src="vector-2001.svg" />
      </div>
      <div className="list2">
        <div className="container4">
          <div className="container5">
            <div className="title7">Recent Orders </div>
            <div className="description3">Check out your past purchases. </div>
          </div>
          <div className="list">
            <div className="row2">
              {orders.map(order => (
                <div className="item" key={order.Order_ID}>
                  <div className="frame">
                    <div className="icon">🛍️ </div>
                    <img className="image-34" src="image-340.png" />
                  </div>
                  <div className="frame-427318906">
                    <div className="title8">Order #{order.Order_ID}</div>
                    <div className="subtitle">Ordered on {order.order_date?.slice(0, 10)}</div>
                  </div>
                  <div className="subtitle2">${order.total_price ? parseFloat(order.total_price).toFixed(2) : '0.00'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="image-container">
          <div className="image2">
            <img className="image-12" src="image-120.png" />
          </div>
        </div>
        <img className="vector-2003" src="vector-2002.svg" />
      </div>
      <div className="form2">
        <div className="container3">
          <div className="title4">Shopping Cart </div>
          <img className="image-35" src="image-350.png" />
          <div className="description2">Product amount: {cartItems.length} </div>
        </div>
        <img className="vector-2004" src="vector-2003.svg" />
      </div>


        {cartItems.map((item, index) => (
          <div className={`item${index + 2}`} key={item.Product_ID || index}>
            <div className="frame">
              <div className="icon">🛍️ </div>
              <img className="image3" src={`image${index + 2}.png`} />
            </div>
            <div className="frame-4273189062">
              <div className="title9">{item.product_name || "Loading..."}</div>
              <div className="subtitle">Quantity: {item.product_quantity}</div>
            </div>
            <div className="subtitle2">${item.product_price ? parseFloat(item.product_price).toFixed(2) : "0.00"}</div>
          </div>
        ))}

    </div>
  );
};
