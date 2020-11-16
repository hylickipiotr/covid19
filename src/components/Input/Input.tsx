import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input className="bg-white border rounded px-2" {...props} />;
};

export default Input;
