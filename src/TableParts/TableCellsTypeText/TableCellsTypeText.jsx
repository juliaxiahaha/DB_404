import "./TableCellsTypeText.css";

function TableCellsTypeText({
                              type = "action",
                              text = "undefined",
                              className = "",
                              ...props
                            }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-cells-type-text ${className} ${variantsClassName}`}
          {...props}
      >
        <div className="monna-liza">{text}</div>
      </div>
  );
}

export default TableCellsTypeText;