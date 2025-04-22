import "./TableTopTypeIcon.css";
import icon24Px0 from "../assets/icon-24-px0.svg";

function TableTopTypeIcon({ type = "search", className = "", ...props }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-top-type-icon ${className} ${variantsClassName}`}
          {...props}
      >
        <img className="icon-24-px" src={icon24Px0} alt="" />
      </div>
  );
}

export default TableTopTypeIcon;