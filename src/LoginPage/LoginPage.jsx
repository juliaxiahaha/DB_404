import "./LoginPage.css";

export const LoginPage = ({ className, ...props }) => {
    return (
        <div className={"login-page " + className}>
            <div className="section">
                <div className="container">
                    <img className="giphy-1" src="giphy-10.png" />
                    <div className="title">Contact Us: buyaozhaowomen@store.com </div>
                    <div className="title2">Copyright © 2025 Store Management </div>
                </div>
            </div>
            <div className="form">
                <div className="container2">
                    <div className="title3">Login Form </div>
                </div>
                <div className="list">
                    <div className="row">
                        <div className="input">
                            <div className="title4">Username </div>
                            <div className="textfield">
                                <div className="text">Enter your username </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input">
                            <div className="title4">Password </div>
                            <div className="textfield">
                                <div className="text">Enter your password </div>
                            </div>
                            <div className="info">
                                Password must be at least 8 characters{" "}
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <div className="seconday">
                            <div className="title5">Create an Account </div>
                        </div>
                        <div className="primary">
                            <div className="title6">Login </div>
                        </div>
                    </div>
                </div>
                <img className="vector-200" src="vector-2000.svg" />
            </div>
        </div>
    );
};
