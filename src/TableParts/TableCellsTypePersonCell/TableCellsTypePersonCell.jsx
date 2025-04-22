import "./TableCellsTypePersonCell.css";
import { User } from "../../../../../../../Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/7c8b392cc3674a1898b949b8d4dba6e5/Message/MessageTemp/c64ec7b6dca34b76518755f08dd9bda3/File/combined/autohtml-project (7)/src/User/User.jsx";
import TableCellsTypeStatus from "../TableCellsTypeStatus/index.jsx";

export const TableCellsTypePersonCell = ({
  type = "action",
  text = "undefined",
  className,
  ...props
}) => {
  const variantsClassName = "type-" + type;

  return (
    <div
      className={
        "table-cells-type-person-cell " + className + " " + variantsClassName
      }
    >
      <User className="user-instance" name={text}></User>
    </div>
  );
};

export default TableCellsTypePersonCell;