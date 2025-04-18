// src/TableParts/TableTopTypeSearch/TableTopTypeSearch.jsx
import "./TableTopTypeSearch.css";

function TableTopTypeSearch({
                              type = "search",
                              text = "undefined",
                              className = "",
                              ...props
                            }) {
  const variantsClassName = "type-" + type;

  return (
      <div
          className={`table-top-type-search ${className} ${variantsClassName}`}
          {...props}
      >
        <div className="search">
          <div className="table-title">{text}</div>
        </div>
        <div className="title">
          <div className="search2">Search</div>
        </div>
      </div>
  );
}

export default TableTopTypeSearch;   // ← key line