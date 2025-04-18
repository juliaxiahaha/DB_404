import "./TableCellsTypeCheckbox.css";

function TableCellsTypeCheckbox({
                                  type = "action",
                                  className = "",
                                  ...props
                                }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-cells-type-checkbox ${className} ${variantsClassName}`}
          {...props}
      >
        <div className="check-box-default">
          <img className="icon-24-px" src="icon-24-px0.svg" alt="" />
        </div>
      </div>
  );
}

export default TableCellsTypeCheckbox;