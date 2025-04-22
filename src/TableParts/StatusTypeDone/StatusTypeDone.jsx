import "./StatusTypeDone.css";

export const StatusTypeDone = ({ type = "done", className, ...props }) => {
  const variantsClassName = "type-" + type;

  return (
    <div className={"status-type-done " + className + " " + variantsClassName}>
      <div className="_01-oct-2018">Active </div>
    </div>
  );
};

export default StatusTypeDone;