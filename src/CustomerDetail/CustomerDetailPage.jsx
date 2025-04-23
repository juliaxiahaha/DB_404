import "./CustomerDetailPage.css";

export const CustomerDetailPage = ({ className, ...props }) => {
  return (
    <div className={"customer-detail-page " + className}>
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
          <div className="title3">John Doe </div>
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
                <div className="text">John Doe </div>
              </div>
            </div>
            <div className="input">
              <div className="title5">Address </div>
              <div className="textfield">
                <div className="text">123 Street, City </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="title5">Phone </div>
              <div className="textfield">
                <div className="text">123-456-7890 </div>
              </div>
            </div>
            <div className="input">
              <div className="title5">Email </div>
              <div className="textfield">
                <div className="text">john.doe@example.com </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <div className="title5">Membership Registration Date </div>
              <div className="textfield">
                <div className="text">MM/DD/YYYY </div>
              </div>
            </div>
          </div>
          <div className="button">
            <div className="primary">
              <div className="title6">Save Changes </div>
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
              <div className="item">
                <div className="frame">
                  <div className="icon">🛍️ </div>
                  <img className="image-34" src="image-340.png" />
                </div>
                <div className="frame-427318906">
                  <div className="title8">Order #1234 </div>
                  <div className="subtitle">Delivered </div>
                </div>
                <div className="subtitle2">$10.00 </div>
              </div>
              <div className="item">
                <div className="frame">
                  <div className="icon">🛍️ </div>
                  <img className="image" src="image0.png" />
                </div>
                <div className="frame-427318906">
                  <div className="title8">Order #5678 </div>
                  <div className="subtitle">Processing </div>
                </div>
                <div className="subtitle2">$29.99 </div>
              </div>
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
      <div className="item2">
        <div className="frame">
          <div className="icon">🛍️ </div>
          <img className="image3" src="image2.png" />
        </div>
        <div className="frame-4273189062">
          <div className="title9">Yummymart Banana </div>
          <div className="subtitle">Quantity: 4 </div>
        </div>
        <div className="subtitle2">$9.88 </div>
      </div>
      <div className="item3">
        <div className="frame">
          <div className="icon">🛍️ </div>
          <img className="image3" src="image3.png" />
        </div>
        <div className="frame-4273189062">
          <div className="title9">Kimi Bear </div>
          <div className="subtitle">Quantity: 1 </div>
        </div>
        <div className="subtitle2">$20.00 </div>
      </div>
      <div className="item4">
        <div className="frame">
          <div className="icon">🛍️ </div>
          <img className="image3" src="image4.png" />
        </div>
        <div className="frame-4273189062">
          <div className="title9">Yummymart Apple </div>
          <div className="subtitle">Quantity: 5 </div>
        </div>
        <div className="subtitle2">$10.00 </div>
      </div>
      <div className="item5">
        <div className="frame">
          <div className="icon">🛍️ </div>
          <img className="image3" src="image5.png" />
        </div>
        <div className="frame-4273189062">
          <div className="title9">Yummymart Grape </div>
          <div className="subtitle">Quantity: 5 </div>
        </div>
        <div className="subtitle2">$6.70 </div>
      </div>
      <div className="form2">
        <div className="container3">
          <div className="title4">Shopping Cart </div>
          <img className="image-35" src="image-350.png" />
          <div className="description2">Product amount: 4 </div>
        </div>
        <img className="vector-2004" src="vector-2003.svg" />
      </div>
      <div className="top-bar">
        <div className="rectangle-4137"></div>
        <div className="title10">Store Management System </div>
        <div className="navigation">
          <div className="tab">Discount </div>
          <div className="tab">Customer </div>
          <div className="tab">Products </div>
          <div className="tab">Orders </div>
          <div className="tab">Employees </div>
          <div className="tab">Supplier </div>
          <div className="tab">Loog in </div>
          <div className="textfield2">
            <div className="text2">Search in site </div>
            <img className="ic-search" src="ic-search0.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};
