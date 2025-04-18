import "./ProductPage.css";
//Import image
import image360 from "/src/ProductPage/assets/image-360.png";
import section1 from "/src/ProductPage/assets/section1.svg";
import vector2000 from "/src/ProductPage/assets/vector-2000.svg";


export const ProductPage = ({ className, ...props }) => {
    return (
        <div className={"product-page " + className}>
            <div className="section">
                <div className="container">
                    <div className="title">Contact Us </div>
                    <div className="title2">Terms &amp; Conditions </div>
                    <div className="title3">Privacy Policy </div>
                </div>
            </div>
            <img className="section2" src={section1} />
            <div className="section3">
                <div className="container2">
                    <div className="title4">Select a product from the product list: </div>
                </div>
                <img className="vector-200" src={vector2000} />
            </div>
            <div className="list">
                <div className="row">
                    <div className="item">
                        <div className="frame">
                            <div className="icon">😃 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 1 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📆 </div>
                            <img className="image-36" src={image360} />
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">Nikon N400 Camera </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon2">📆 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 3 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">👍 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 4 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">🎉 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 5 </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="item">
                        <div className="frame">
                            <div className="icon">🌟 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 6 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📆 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 7 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📞 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 8 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">🔑 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 9 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">💻 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 10 </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📆 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 11 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📌 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 12 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📋 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 13 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📧 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 14 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">🖊️ </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 15 </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📯 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 16 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📜 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 17 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📇 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 18 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">📚 </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 19 </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="frame">
                            <div className="icon">🖊️ </div>
                        </div>
                        <div className="frame-427318906">
                            <div className="title5">product 20 </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section4">
                <div className="container3">
                    <div className="title7">Contact Us: buyaozhaowomen@store.com </div>
                    <div className="title8">Copyright © 2025 Store Management </div>
                </div>
            </div>
        </div>
    );
};
