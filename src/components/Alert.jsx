import React from "react";

const Alert = ({ text, color }) => {
  let message = "";

  if (color === "red") {
    message = `${text} has been deleted`;
  } else if (color === "green") {
    message = `${text} has been updated`;
  } else if (color === "blue") {
    message = `${text} has been added`;
  }else{
    message = `you cant add null to the list`; 
  }

  return (
    <div className={`Alert Alert-${color}`}>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
