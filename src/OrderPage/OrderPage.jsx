import "./OrderPage.css";

import {
    TableCellsTypeCheckbox,
    TableCellsTypeText,
    TableCellsTypeStatus,
    TableCellsTypeTag,
    TableCellsTypePersonCell,
    TableCellsCurre,
    TableCellsTypeAction,
    StatusTypeDanger,
    StatusTypeWarning,
} from "../TableParts";

export const OrderPage = ({ className, ...props }) => {
    return (
        <div className={"order-page " + className}>
            <div className="order-container">
                <h1 className="order-title">Order List</h1>

                <div className="order-table">
                    <TableCellsTypeCheckbox />
                    <TableCellsTypeText text="#1023" />
                    <TableCellsTypeStatus text="Completed" />
                    <TableCellsTypeText text="Evan Flores" />
                    <TableCellsTypeTag text="8/24/2000" />
                    <TableCellsTypePersonCell text="Evan Flores" />
                    <TableCellsCurre text="$452.85" />
                    <TableCellsTypeAction />

                    <TableCellsTypeCheckbox />
                    <TableCellsTypeText text="#0202" />
                    <TableCellsTypeStatus
                        text="Delivered"
                        component={<StatusTypeDanger type="danger" />}
                    />
                    <TableCellsTypeText text="Arlene Wilson" />
                    <TableCellsTypeTag text="7/31/1999" />
                    <TableCellsTypePersonCell text="Arlene Wilson" />
                    <TableCellsCurre text="$901.31" />
                    <TableCellsTypeAction />

                    <TableCellsTypeCheckbox />
                    <TableCellsTypeText text="#4399" />
                    <TableCellsTypeStatus
                        text="Shipped"
                        component={<StatusTypeWarning type="warning" />}
                    />
                    <TableCellsTypeText text="Jennie Cooper" />
                    <TableCellsTypeTag text="4/19/2004" />
                    <TableCellsTypePersonCell text="Jennie Cooper" />
                    <TableCellsCurre text="$641.20" />
                    <TableCellsTypeAction />

                    <TableCellsTypeCheckbox />
                    <TableCellsTypeText text="#1717" />
                    <TableCellsTypeStatus
                        text="Canceled"
                        component={<StatusTypeDanger type="danger" />}
                    />
                    <TableCellsTypeText text="Philip Steward" />
                    <TableCellsTypeTag text="5/5/2023" />
                    <TableCellsTypePersonCell text="Philip Steward" />
                    <TableCellsCurre text="$510.30" />
                    <TableCellsTypeAction />

                    <TableCellsTypeCheckbox />
                    <TableCellsTypeText text="#3928" />
                    <TableCellsTypeStatus
                        text="Refunded"
                        component={<StatusTypeWarning type="warning" />}
                    />
                    <TableCellsTypeText text="Jorge Black" />
                    <TableCellsTypeTag text="3/4/2004" />
                    <TableCellsTypePersonCell text="Jorge Black" />
                    <TableCellsCurre text="$828.90" />
                    <TableCellsTypeAction />

                    <TableCellsTypeCheckbox />
                    <TableCellsTypeText text="#2749" />
                    <TableCellsTypeStatus
                        text="Processing"
                        component={<StatusTypeDanger type="danger" />}
                    />
                    <TableCellsTypeText text="Gladys Jones" />
                    <TableCellsTypeTag text="9/25/2002" />
                    <TableCellsTypePersonCell text="Gladys Jones" />
                    <TableCellsCurre text="$845.59" />
                    <TableCellsTypeAction />
                </div>
            </div>
        </div>
    );
}