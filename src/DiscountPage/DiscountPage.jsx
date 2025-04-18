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

export const DiscountPage = ({ className, ...props }) => {
    return (
        <div className={"discount-page " + className}>
            <div className="container">
                <div className="title2">Add Discount </div>
                <div className="description">Fill in the details below </div>
            </div>
            <div className="list">
                <div className="row">
                    <div className="input">
                        <div className="title3">Discount Type </div>
                        <div className="textfield2">
                            <div className="text2">E.g. Percentage or Fixed Amount </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input">
                        <div className="title3">Discount Value </div>
                        <div className="textfield2">
                            <div className="text2">Enter the value </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input">
                        <div className="title3">Start Date </div>
                        <div className="textfield2">
                            <div className="text2">Select start date </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input">
                        <div className="title3">End Date </div>
                        <div className="textfield2">
                            <div className="text2">Select end date </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="input2">
                <div className="title3">Product </div>
                <div className="textfield2">
                    <div className="text2">Select products </div>
                </div>
            </div>
            <div className="button">
                <div className="seconday">
                    <div className="title4">Cancel </div>
                </div>
                <div className="primary">
                    <div className="title5">Add Discount </div>
                </div>
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
            <TableTopTypeIcon
                type="icon"
                className="table-top-instance"
            ></TableTopTypeIcon>
            <TableTopTypeSearch
                text="Discount ID"
                className="table-top-instance2"
            ></TableTopTypeSearch>
            <TableTopTypeSearch
                text="Start date"
                className="table-top-instance3"
            ></TableTopTypeSearch>
            <TableTopTypeSearch
                text="End date"
                className="table-top-instance4"
            ></TableTopTypeSearch>
            <TableTopTypeSearch
                text="Action"
                className="table-top-instance5"
            ></TableTopTypeSearch>
            <TableCellsTypeCheckbox
                type="checkbox"
                className="table-cells-instance"
            ></TableCellsTypeCheckbox>
            <TableCellsTypeText
                type="text"
                text="11 "
                className="table-cells-instance2"
            ></TableCellsTypeText>
            <TableCellsTypeTag
                type="tag"
                text="2024-03-01"
                className="table-cells-instance3"
            ></TableCellsTypeTag>
            <TableCellsTypeAction className="table-cells-instance4"></TableCellsTypeAction>
            <TableCellsTypeCheckbox
                type="checkbox"
                className="table-cells-instance5"
            ></TableCellsTypeCheckbox>
            <TableCellsTypeText
                type="text"
                text="12"
                className="table-cells-instance6"
            ></TableCellsTypeText>
            <TableCellsTypeTag
                type="tag"
                text="2024-04-01"
                className="table-cells-instance7"
            ></TableCellsTypeTag>
            <TableCellsTypeAction className="table-cells-instance8"></TableCellsTypeAction>
            <TableCellsTypeCheckbox
                type="checkbox"
                className="table-cells-instance9"
            ></TableCellsTypeCheckbox>
            <TableCellsTypeText
                type="text"
                text="13"
                className="table-cells-instance10"
            ></TableCellsTypeText>
            <TableCellsTypeTag
                type="tag"
                text="2024-03-10"
                className="table-cells-instance11"
            ></TableCellsTypeTag>
            <TableCellsTypeAction className="table-cells-instance12"></TableCellsTypeAction>
            <TableCellsTypeCheckbox
                type="checkbox"
                className="table-cells-instance13"
            ></TableCellsTypeCheckbox>
            <TableCellsTypeText
                type="text"
                text="14"
                className="table-cells-instance14"
            ></TableCellsTypeText>
            <TableCellsTypeTag
                type="tag"
                text="2024-06-01"
                className="table-cells-instance15"
            ></TableCellsTypeTag>
            <TableCellsTypeAction className="table-cells-instance16"></TableCellsTypeAction>
            <TableCellsTypeCheckbox
                type="checkbox"
                className="table-cells-instance17"
            ></TableCellsTypeCheckbox>
            <TableCellsTypeText
                type="text"
                text="25"
                className="table-cells-instance18"
            ></TableCellsTypeText>
            <TableCellsTypeTag
                type="tag"
                text="2025-06-18"
                className="table-cells-instance19"
            ></TableCellsTypeTag>
            <TableCellsTypeAction className="table-cells-instance20"></TableCellsTypeAction>
            <TableCellsTypeCheckbox
                type="checkbox"
                className="table-cells-instance21"
            ></TableCellsTypeCheckbox>
            <TableCellsTypeText
                type="text"
                text="26"
                className="table-cells-instance22"
            ></TableCellsTypeText>
            <TableTopTypeSearch
                text="Value"
                className="table-top-instance6"
            ></TableTopTypeSearch>
            <TableCellsTypeText
                type="text"
                text="90% "
                className="table-cells-instance23"
            ></TableCellsTypeText>
            <TableCellsTypeText
                type="text"
                text="80%"
                className="table-cells-instance24"
            ></TableCellsTypeText>
            <TableCellsTypeText
                type="text"
                text="70%"
                className="table-cells-instance25"
            ></TableCellsTypeText>
            <TableCellsTypeText
                type="text"
                text="60%"
                className="table-cells-instance26"
            ></TableCellsTypeText>
            <TableCellsTypeText
                type="text"
                text="50%"
                className="table-cells-instance27"
            ></TableCellsTypeText>
            <TableCellsTypeText
                type="text"
                text="40%"
                className="table-cells-instance28"
            ></TableCellsTypeText>
            <TableCellsTypeTag
                type="tag"
                text="2025-11-27"
                className="table-cells-instance29"
            ></TableCellsTypeTag>
            <TableCellsTypeTag
                type="tag"
                text="2024-03-31"
                className="table-cells-instance30"
            ></TableCellsTypeTag>
            <TableCellsTypeTag
                type="tag"
                text="2024-04-15"
                className="table-cells-instance31"
            ></TableCellsTypeTag>
            <TableCellsTypeTag
                type="tag"
                text="2024-03-20"
                className="table-cells-instance32"
            ></TableCellsTypeTag>
            <TableCellsTypeTag
                type="tag"
                text="2024-06-07"
                className="table-cells-instance33"
            ></TableCellsTypeTag>
            <TableCellsTypeTag
                type="tag"
                text="2025-06-19"
                className="table-cells-instance34"
            ></TableCellsTypeTag>
            <TableCellsTypeTag
                type="tag"
                text="2025-11-28"
                className="table-cells-instance35"
            ></TableCellsTypeTag>
            <TableTopTypeDroplist
                type="droplist"
                text="Type "
                text2="All"
                className="table-top-instance7"
            ></TableTopTypeDroplist>
            <TableCellsCurre
                text="Seasonal"
                className="table-cells-curre-instance"
            ></TableCellsCurre>
            <TableCellsCurre
                text="Clearance"
                className="table-cells-curre-instance2"
            ></TableCellsCurre>
            <TableCellsCurre
                text="Promo"
                className="table-cells-curre-instance3"
            ></TableCellsCurre>
            <TableCellsCurre
                text="Childrens Day Special"
                className="table-cells-curre-instance4"
            ></TableCellsCurre>
            <TableCellsCurre
                text="618"
                className="table-cells-curre-instance5"
            ></TableCellsCurre>
            <TableCellsCurre
                text="BlackFriday"
                className="table-cells-curre-instance6"
            ></TableCellsCurre>
            <TableCellsTypeAction className="table-cells-instance36"></TableCellsTypeAction>
            <div className="pagination">
                <div className="content">16 </div>
                <div className="content2">/ </div>
                <div className="small-icon-button-secondary-default">
                    <div className="button-base-secondary-default">
                        <img className="background" src="background0.svg" />
                    </div>
                    <img className="icons-8-back-filled" src="icons-8-back-filled0.svg" />
                </div>
                <div className="text-field-small-simple">
                    <div className="field-container-default">
                        <img className="base-bg-default" src="base-bg-default0.svg" />
                        <img className="rectangle" src="rectangle0.svg" />
                    </div>
                    <div className="placeholder">1 </div>
                </div>
            </div>
            <div className="small-icon-button-secondary-default2">
                <div className="button-base-secondary-default">
                    <img className="background2" src="background1.svg" />
                </div>
                <img className="icons-8-right" src="icons-8-right0.svg" />
            </div>
            <div className="rows-per-page">
                <div className="content3">Rows per page </div>
                <div className="text-field-small-select-hard">
                    <div className="field-container-default">
                        <img className="base-bg-select" src="base-bg-select0.svg" />
                        <img className="rectangle2" src="rectangle1.svg" />
                    </div>
                    <div className="placeholder2">15 </div>
                    <img className="ic-arrow-drop-down" src="ic-arrow-drop-down0.svg" />
                </div>
            </div>
            <div className="frame-427318907"></div>
        </div>
    );
};
