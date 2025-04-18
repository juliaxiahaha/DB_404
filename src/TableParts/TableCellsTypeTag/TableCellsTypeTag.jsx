import "./TableCellsTypeTag.css";
import { Tag } from "../Tag/Tag.jsx";

function TableCellsTypeTag({
                             type = "action",
                             text = "undefined",
                             className = "",
                             ...props
                           }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-cells-type-tag ${className} ${variantsClassName}`}
          {...props}
      >
        <Tag className="tag-instance">{text}</Tag>
      </div>
  );
}

export default TableCellsTypeTag;