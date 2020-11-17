import classNames from "classnames";
import React from "react";

type ButtonColors =
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";

interface IButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  size?: "small" | "normal";
  variant?: "solid" | "outline" | "text";
  color: ButtonColors;
  wFull?: boolean;
}

const Button: React.FC<IButton> = ({
  label,
  type,
  size = "normal",
  variant = "solid",
  color,
  className,
  wFull,
  ...buttonProps
}) => {
  return (
    <button
      title={label}
      type={type}
      {...buttonProps}
      className={classNames(
        "flex items-center font-bold cursor-pointer transition-all duration-200 ease-in-out focus:outline-none disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-not-allowed",
        `focus:shadow-outline-${color}`,
        {
          [`bg-${color}-600 text-white hover:bg-${color}-700`]:
            variant === "solid",
          [`text-${color}-600 border border-${color}-600 hover:bg-${color}-600 hover:text-white`]:
            variant === "outline",
          [`text-${color}-600 hover:text-${color}-500`]: variant === "text",
          "w-full": wFull ? wFull : false,
          "px-4 py-2 rounded-md text-sm": size === "normal",
          "px-2 py-1 rounded-sm text-xs": size === "small",
          "justify-center": !wFull,
        },
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;
