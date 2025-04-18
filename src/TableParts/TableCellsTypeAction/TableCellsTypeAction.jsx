import "./TableCellsTypeAction.css";

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
        <img className="icons-8-more" src="icons-8-more0.svg" alt="" />
      </div>
  );
}

export default TableCellsTypeAction;