import "./TableCellsTypeCheckbox.css";
import icon24Px0 from '../assets/icon-24-px0.svg';

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
          <img className="icon-24-px" src={icon24Px0} alt="" />
        </div>
      </div>
  );
}

export default TableCellsTypeCheckbox;