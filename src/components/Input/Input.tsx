import React from "react";
import classNames from "classnames";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        "bg-white text-gray-800 hover:text-gray-900 border border-gray-400 rounded px-2 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none focus:shadow-outline",
        className
      )}
      {...props}
    />
  );
};

export default Input;
