import "./StatusTypeDanger.css";
import TableCellsTypeStatus from "../TableCellsTypeStatus/index.jsx";

export const StatusTypeDanger = ({ type = "done", className, ...props }) => {
  const variantsClassName = "type-" + type;

  return (
    <div
      className={"status-type-danger " + className + " " + variantsClassName}
    >
      <div className="_01-oct-2018">Danger </div>
    </div>
  );
};

export default StatusTypeDanger;