import "./TableTopTypeDroplist.css";
import counter0 from '../assets/counter0.svg';

function TableTopTypeDroplist({
                                type = "search",
                                text = "Title",
                                text2 = "All",
                                className = "",
                                ...props
                              }) {
  const variantsClassName = `type-${type}`;

  return (
      <div
          className={`table-top-type-droplist ${className} ${variantsClassName}`}
          {...props}
      >
        <div className="title">
          <div className="table-title">{text}</div>
          <img className="counter" src={counter0} alt="" />
        </div>

        <div className="select">
          <div className="all">{text2}</div>
          <img className="ic-arrow-drop-down" src="ic-arrow-drop-down0.svg" alt="" />
        </div>
      </div>
  );
}

export default TableTopTypeDroplist;