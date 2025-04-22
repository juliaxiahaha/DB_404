import "./User.css";

export const User = ({ className, ...props }) => {
  return (
    <div className={"user " + className}>
      <img className="ava" src="ava0.svg" />
      <div className="content">Colleen Lane </div>
    </div>
  );
};
