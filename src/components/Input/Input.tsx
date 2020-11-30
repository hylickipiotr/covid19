import React from "react";
import classNames from "classnames";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      style={{
        minHeight: "38px",
      }}
      className={classNames(
        "input",
        "bg-white text-gray-800 border border-gray-300 rounded px-2 transition-all duration-200 ease-in-out  disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-1",
        className
      )}
      {...props}
    />
  );
};

export default Input;
