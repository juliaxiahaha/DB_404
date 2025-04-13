import "./CustomerPage.css";

export const CustomerPage = ({ className, ...props }) => {
    return (
        <div className={"customer-page " + className}>
            <div className="section">
                <div className="container">
                    <img className="giphy-1" src="giphy-10.png" alt="Customer Image" />
                    <div className="title">Welcome to Our Store Management</div>
                    <div className="title2">Select a customer from the list below:</div>
                </div>
            </div>
            <div className="form">
                <div className="container2">
                    <div className="title3">Customer List</div>
                </div>
                <div className="list">
                    {/* Map over the customers */}
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 1: Alice Johnson</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 2: Bob Lee</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 3: Charlie Smith</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 4: Diana Garcia</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 5: Eve Kim</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 6: Frank Wright</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 7: Grace Lin</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 8: Henry Zhao</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 9: Isabel Chen</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Customer 10: Jackie Nguyen</div>
                        </div>
                    </div>
                </div>
                <div className="button">
                    <div className="primary">
                        <div className="title6">Select Customer</div>
                    </div>
                </div>
            </div>
            <img className="vector-200" src="vector-2000.svg" alt="Vector Image" />
        </div>
    );
};
