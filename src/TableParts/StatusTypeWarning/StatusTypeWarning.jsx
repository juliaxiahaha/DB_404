import "./StatusTypeWarning.css";
import TableCellsCurre from "../TableCellsCurre/index.jsx";

export const StatusTypeWarning = ({ type = "done", className, ...props }) => {
  const variantsClassName = "type-" + type;

  return (
    <div
      className={"status-type-warning " + className + " " + variantsClassName}
    >
      <div className="_01-oct-2018">Pending </div>
    </div>
  );
};

export default StatusTypeWarning;
