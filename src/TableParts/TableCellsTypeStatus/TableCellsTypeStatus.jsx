import "./TableCellsTypeStatus.css";
import { StatusTypeDone } from "../../../../../../../Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/7c8b392cc3674a1898b949b8d4dba6e5/Message/MessageTemp/c64ec7b6dca34b76518755f08dd9bda3/File/combined/autohtml-project (7)/src/StatusTypeDone/StatusTypeDone.jsx";
import TableCellsTypeTag from "../TableCellsTypeTag/index.jsx";

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

export default TableCellsTypeStatus;