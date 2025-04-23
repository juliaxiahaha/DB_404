import "./ProductDetailPage.css";

export const ProductDetailPage = ({ className, ...props }) => {
  return (
    <div className={"product-detail-page " + className}>
      <div className="title">Supplier Information </div>
      <div className="title2">Product Information </div>
      <div className="data-metrics">
        <div className="container">
          <div className="container2">
            <div className="title3">Sales Performance </div>
          </div>
        </div>
        <div className="list">
          <div className="row">
            <div className="metric">
              <div className="title4">Product Name </div>
              <div className="data">Nikon N400 Camera </div>
            </div>
            <div className="metric">
              <div className="title4">Retail price </div>
              <div className="data">$5000 </div>
              <div className="change">-10% </div>
            </div>
            <div className="metric">
              <div className="title4">Purchasing price </div>
              <div className="data">$5500 </div>
              <div className="change">+5% </div>
            </div>
          </div>
        </div>
        <div className="container3">
          <div className="container4">
            <div className="title5">Monthly Sales </div>
            <div className="y-axis">Sales Value </div>
            <img className="graph" src="graph0.svg" />
            <div className="x-axis">Months </div>
          </div>
        </div>
        <img className="vector-200" src="vector-2000.svg" />
      </div>
      <img className="section" src="section0.svg" />
      <div className="title6">
        Supplier Name: Nikon New York #8 Dealer
        <br />
        <br />
        Supplier Logo:
        <br />{" "}
      </div>
      <div className="title7">
        Product name: Nikon N400 Camera
        <br />
        <br />
        Category: Digital product
        <br />
        <br />{" "}
      </div>
      <div className="title8">Overall rating: 4.7/5.0 </div>
      <img className="image-33" src="image-330.png" />
      <div className="container5">
        <div className="list2">
          <div className="row2">
            <div className="card">
              <div className="user">
                <div className="avatar">
                  <div className="avatar2"></div>
                  <div className="frame-427318906">
                    <div className="title9">Customer3 </div>
                  </div>
                </div>
                <img className="frame-427318817" src="frame-4273188170.svg" />
              </div>
              <div className="title10">3/15/2024 </div>
              <div className="title11">
                Excellent product quality and fast delivery{" "}
              </div>
            </div>
            <div className="card">
              <div className="user">
                <div className="avatar">
                  <div className="avatar2"></div>
                  <div className="frame-427318906">
                    <div className="title9">Customer4 </div>
                  </div>
                </div>
                <img className="frame-4273188172" src="frame-4273188171.svg" />
              </div>
              <div className="title10">5/20/2024 </div>
              <div className="title11">
                Impressed with the customer service and packaging{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="container6"></div>
      </div>
      <div className="container7">
        <div className="list2">
          <div className="row2">
            <div className="card">
              <div className="user">
                <div className="avatar">
                  <div className="avatar2"></div>
                  <div className="frame-427318906">
                    <div className="title9">Customer5 </div>
                  </div>
                </div>
                <img className="frame-4273188173" src="frame-4273188172.svg" />
              </div>
              <div className="title10">3/15/2024 </div>
              <div className="title11">Good camera make me dance </div>
            </div>
            <div className="card">
              <div className="user">
                <div className="avatar">
                  <div className="avatar2"></div>
                  <div className="frame-427318906">
                    <div className="title9">Customer6 </div>
                  </div>
                </div>
                <img className="frame-4273188174" src="frame-4273188173.svg" />
              </div>
              <div className="title10">5/20/2024 </div>
              <div className="title11">I love the photos I get! </div>
            </div>
          </div>
        </div>
        <div className="container6"></div>
      </div>
      <div className="social-posts">
        <div className="list3">
          <div className="row3">
            <div className="post">
              <div className="user2">
                <div className="avatar">
                  <div className="avatar2"></div>
                  <div className="frame-427318906">
                    <div className="title9">Customer1 </div>
                    <div className="subtitle">3 hours ago, New York </div>
                  </div>
                </div>
                <div className="icon-buttons">
                  <div className="icon">••• </div>
                </div>
              </div>
              <div className="image-container">
                <div className="image">
                  <div className="title12">Customer Image </div>
                  <div className="pagination">
                    <div className="rectangle-3343"></div>
                    <div className="rectangle-3344"></div>
                    <div className="rectangle-3347"></div>
                    <div className="rectangle-3340"></div>
                  </div>
                  <img className="image-29" src="image-290.png" />
                </div>
              </div>
              <div className="text-content">
                <div className="title13">
                  Great product, highly recommended!{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row3">
            <div className="post">
              <div className="user2">
                <div className="avatar">
                  <div className="avatar2"></div>
                  <div className="frame-427318906">
                    <div className="title9">Customer2 </div>
                    <img
                      className="frame-427318818"
                      src="frame-4273188180.svg"
                    />
                    <div className="subtitle">5 hours ago, London </div>
                  </div>
                </div>
                <div className="icon-buttons">
                  <div className="icon">••• </div>
                </div>
              </div>
              <div className="image-container">
                <div className="image">
                  <div className="title12">Customer Image </div>
                  <div className="pagination">
                    <div className="rectangle-3343"></div>
                    <div className="rectangle-3344"></div>
                    <div className="rectangle-3347"></div>
                    <div className="rectangle-3340"></div>
                  </div>
                  <img className="image-30" src="image-300.png" />
                </div>
              </div>
              <div className="text-content">
                <div className="title13">
                  Amazing quality, worth the price.{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="vector-2002" src="vector-2001.svg" />
      </div>
      <div className="title14">Customer Reviews </div>
      <div className="top-bar">
        <div className="rectangle-4137"></div>
        <div className="title15">Store Management System </div>
        <div className="navigation">
          <div className="tab">Discount </div>
          <div className="tab">Customer </div>
          <div className="tab">Products </div>
          <div className="tab">Orders </div>
          <div className="tab">Employees </div>
          <div className="tab">Supplier </div>
          <div className="tab">Loog in </div>
          <div className="textfield">
            <div className="text">Search in site </div>
            <img className="ic-search" src="ic-search0.svg" />
          </div>
        </div>
      </div>
      <div className="container8">
        <div className="title16">Discount </div>
      </div>
      <div className="row4">
        <div className="item">
          <div className="frame"></div>
          <div className="frame-4273189062">
            <div className="title17">Dates </div>
          </div>
          <div className="subtitle2">10/1/2025-12/1/2025 </div>
        </div>
      </div>
      <div className="item2">
        <div className="frame">
          <div className="icon2">😊 </div>
        </div>
        <div className="frame-4273189062">
          <div className="title17">Type </div>
        </div>
        <div className="subtitle2">Thanksgiving </div>
      </div>
      <div className="item3">
        <div className="frame"></div>
        <div className="frame-4273189062">
          <div className="title17">Value </div>
        </div>
        <div className="subtitle2">50% off </div>
      </div>
      <div className="section2">
        <div className="container9">
          <div className="title18">Contact Us: buyaozhaowomen@store.com </div>
          <div className="title19">Copyright © 2025 Store Management </div>
        </div>
      </div>
    </div>
  );
};
