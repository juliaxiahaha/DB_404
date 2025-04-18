import "./OrderPage.css";

// Import SVGs
import counter0 from "/src/OrderPage/assets/counter0.svg";
import baseBgSelect0 from "/src/OrderPage/assets/base-bg-select0.svg";
import rectangle0 from "/src/OrderPage/assets/rectangle0.svg";
import icArrowDropDown0 from "/src/OrderPage/assets/ic-arrow-drop-down0.svg";
import background0 from "/src/OrderPage/assets/background0.svg";
import icons8Right0 from "/src/OrderPage/assets/icons-8-right0.svg";
import background1 from "/src/OrderPage/assets/background1.svg";
import icons8BackFilled0 from "/src/OrderPage/assets/icons-8-back-filled0.svg";
import baseBgDefault0 from "/src/OrderPage/assets/base-bg-default0.svg";
import rectangle1 from "/src/OrderPage/assets/rectangle1.svg";
import icSearch0 from "/src/OrderPage/assets/ic-search0.svg";



export const OrderPage = ({ className, ...props }) => {
    return (
        <div className={"order-page " + className}>
            <img className="counter" src={counter0} />

            <div className="rows-per-page">
                <div className="content">Rows per page </div>
                <div className="text-field-small-select-hard">
                    <div className="field-container-default">
                        <img className="base-bg-select" src={baseBgSelect0} />
                        <img className="rectangle" src={rectangle0} />
                    </div>
                    <div className="placeholder">15 </div>
                    <img className="ic-arrow-drop-down" src={icArrowDropDown0} />
                </div>
            </div>
            <div className="pagination">
                <div className="content2">16 </div>
                <div className="content3">/ </div>
                <div className="small-icon-button-secondary-default">
                    <div className="button-base-secondary-default">
                        <img className="background" src={background0} />
                    </div>
                    <img className="icons-8-right" src={icons8Right0} />
                </div>
                <div className="small-icon-button-secondary-default2">
                    <div className="button-base-secondary-default">
                        <img className="background2" src={background1} />
                    </div>
                    <img className="icons-8-back-filled" src={icons8BackFilled0} />
                </div>
                <div className="text-field-small-simple">
                    <div className="field-container-default">
                        <img className="base-bg-default" src={baseBgDefault0} />
                        <img className="rectangle2" src={rectangle1} />
                    </div>
                    <div className="placeholder2">1 </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="title">Contact Us: buyaozhaowomen@store.com </div>
                    <div className="title2">Copyright © 2025 Store Management </div>
                </div>
            </div>
            <div className="container2">
                <div className="title3">Order List </div>
            </div>

        </div>
    );
};
