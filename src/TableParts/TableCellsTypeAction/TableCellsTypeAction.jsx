import "./TableCellsTypeAction.css";
import icon8more from "../assets/icons-8-more0.svg";

function TableCellsTypeAction({
                                type = "action",
                                className = "",
                                ...props
                              }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-cells-type-action ${className} ${variantsClassName}`}
          {...props}
      >
        <img className="icons-8-more" src={icon8more} alt="" />
      </div>
  );
}

export default TableCellsTypeAction;