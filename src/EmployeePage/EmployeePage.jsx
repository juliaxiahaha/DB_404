import "./EmployeePage.css";

// Import assets
import vector2000 from "/src/EmployeePage/assets/vector-2000.svg";
import vector2001 from "/src/EmployeePage/assets/vector-2001.svg";
import background0 from "/src/EmployeePage/assets/background0.svg";
import background1 from "/src/EmployeePage/assets/background1.svg";
import icons8BackFilled0 from "/src/EmployeePage/assets/icons-8-back-filled0.svg";
import icons8Right0 from "/src/EmployeePage/assets/icons-8-right0.svg";
import baseBgDefault0 from "/src/EmployeePage/assets/base-bg-default0.svg";
import rectangle0 from "/src/EmployeePage/assets/rectangle0.svg";
import baseBgSelect0 from "/src/EmployeePage/assets/base-bg-select0.svg";
import rectangle1 from "/src/EmployeePage/assets/rectangle1.svg";
import icArrowDropDown0 from "/src/EmployeePage/assets/ic-arrow-drop-down0.svg";

export const EmployeePage = ({ className, ...props }) => {
    return (
        <div className={"employee-page " + className}>
            <div className="page">
                <div className="section">
                    <div className="container">
                        <div className="title">Employee Records</div>
                        <div className="description">Manage employee data efficiently</div>
                        <div className="button">
                            <div className="primary">
                                <div className="title2">Add Employee</div>
                            </div>
                        </div>
                    </div>
                    <img className="vector-200" src={vector2000} />
                </div>
            </div>
            <div className="section2">
                <div className="container2">
                    <div className="title3">Contact Us: buyaozhaowomen@store.com</div>
                    <div className="title4">Copyright © 2025 Store Management</div>
                </div>
            </div>
            <div className="form">
                <div className="container3">
                    <div className="title">Add/Edit Employee Details</div>
                </div>
                <div className="row">
                    <div className="input">
                        <div className="title5">Employee ID</div>
                        <div className="textfield">
                            <div className="text">Enter Employee ID</div>
                        </div>
                        <div className="info">Unique identifier</div>
                    </div>
                    <div className="input">
                        <div className="title5">Basic Salary</div>
                        <div className="textfield">
                            <div className="text">Enter Basic Salary</div>
                        </div>
                        <div className="info">in USD</div>
                    </div>
                </div>
                <div className="row2">
                    <div className="input">
                        <div className="title5">Annual Bonus</div>
                        <div className="textfield">
                            <div className="text">Enter Annual Bonus</div>
                        </div>
                        <div className="info">in USD</div>
                    </div>
                </div>
                <div className="button">
                    <div className="primary">
                        <div className="title2">Save</div>
                    </div>
                </div>
                <img className="vector-2002" src={vector2001} />
            </div>
            <div className="container4">
                <div className="title">Employee List</div>
            </div>
            {/* ... table components ... */}
            <div className="pagination">
                <div className="content">16</div>
                <div className="content2">/</div>
                <div className="small-icon-button-secondary-default">
                    <div className="button-base-secondary-default">
                        <img className="background" src={background0} />
                    </div>
                    <img className="icons-8-back-filled" src={icons8BackFilled0} />
                </div>
                <div className="text-field-small-simple">
                    <div className="field-container-default">
                        <img className="base-bg-default" src={baseBgDefault0} />
                        <img className="rectangle" src={rectangle0} />
                    </div>
                    <div className="placeholder">1</div>
                </div>
            </div>
            <div className="small-icon-button-secondary-default2">
                <div className="button-base-secondary-default">
                    <img className="background2" src={background1} />
                </div>
                <img className="icons-8-right" src={icons8Right0} />
            </div>
            <div className="rows-per-page">
                <div className="content3">Rows per page</div>
                <div className="text-field-small-select-hard">
                    <div className="field-container-default">
                        <img className="base-bg-select" src={baseBgSelect0} />
                        <img className="rectangle2" src={rectangle1} />
                    </div>
                    <div className="placeholder2">15</div>
                    <img className="ic-arrow-drop-down" src={icArrowDropDown0} />
                </div>
            </div>
        </div>
    );
};
