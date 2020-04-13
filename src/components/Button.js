import React from "react";

const Button = ({ children, onclick, style, className, type }) => {
  return (
    <button className={className} style={style} onClick={onclick} type={type}>
      {children}
    </button>
  );
};

export default Button;
