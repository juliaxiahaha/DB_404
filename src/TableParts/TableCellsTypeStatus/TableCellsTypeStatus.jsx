import "./TableCellsTypeStatus.css";
import { StatusTypeDone } from "../StatusTypeDone/StatusTypeDone.jsx";

export const TableCellsTypeStatus = ({
                                       type = "action",
                                       text = "undefined",
                                       className,
                                       ...props
                                     }) => {
  const variantsClassName = "type-" + type;

  return (
      <div
          className={
              "table-cells-type-status " + className + " " + variantsClassName
          }
      >
        <StatusTypeDone className="status-instance"></StatusTypeDone>
      </div>
  );
};

export default TableCellsTypeStatus