import React from "react";
import { ControlProps } from "react-select";
import { Country } from "../../types/Country";

type Props = ControlProps<Country>;

const SelectControl: React.FC<Props> = (props) => {
  const { children, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      className="relative flex flex-wrap justify-between items-center bg-white cursor-default rounded border border-gray-300 transition box-border hover:border-gray-400 focus-within:ring-1"
      style={{ minHeight: "38px" }}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export default SelectControl;
