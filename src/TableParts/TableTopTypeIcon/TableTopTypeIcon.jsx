import "./TableTopTypeIcon.css";

function TableTopTypeIcon({ type = "search", className = "", ...props }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-top-type-icon ${className} ${variantsClassName}`}
          {...props}
      >
        <img className="icon-24-px" src="icon-24-px0.svg" alt="" />
      </div>
  );
}

export default TableTopTypeIcon;