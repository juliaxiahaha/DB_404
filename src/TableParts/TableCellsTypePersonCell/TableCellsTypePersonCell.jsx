import "./TableCellsTypePersonCell.css";
import { User } from "../User/User.jsx";

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
        <User className="user-instance"></User>
      </div>
  );
};