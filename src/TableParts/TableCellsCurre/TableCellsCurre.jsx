import "./TableCellsCurre.css";

function TableCellsCurre({ text = "undefined", className = "", ...props }) {
    return (
        <div className={`table-cells-curre ${className}`} {...props}>
            <div className="background" />
            <div className="separator" />
            <div className="_123-000">{text}</div>
        </div>
    );
}

export default TableCellsCurre;