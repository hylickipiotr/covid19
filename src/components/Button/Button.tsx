import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  icon?: IconProp;
  onlyIcon?: boolean;
}

const Button: React.FC<IButton> = ({
  label,
  type,
  size = "normal",
  variant = "solid",
  color,
  className,
  wFull,
  icon,
  onlyIcon,
  disabled,
  ...buttonProps
}) => {
  return (
    <button
      title={label}
      type={type}
      disabled={disabled}
      {...buttonProps}
      className={classNames(
        "flex items-center font-bold cursor-pointer transition-all duration-200 ease-in-out focus:outline-none disabled:cursor-not-allowed",
        `focus:shadow-outline`,
        {
          [`bg-${color}-600 text-white hover:bg-${color}-700 disabled:bg-gray-300 disabled:text-gray-100`]:
            variant === "solid",
          [`border  hover:text-white disabled:border-gray-300 disabled:text-gray-300`]:
            variant === "outline",
          [`text-${color}-600 border-${color}-600`]:
            variant === "outline" && color !== "gray",
          "text-gray-900 border-gray-400 hover:border-gray-500":
            variant === "outline" && color === "gray",
          [`hover:bg-${color}-600`]: variant === "outline" && !disabled,
          [`text-${color}-600 hover:text-${color}-500`]: variant === "text",
          "w-full": wFull ? wFull : false,
          "px-4 py-2 rounded-md text-sm": size === "normal",
          "px-2 py-1 rounded-sm text-xs": size === "small",
          "justify-center": !wFull,
        },
        className
      )}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className={classNames({
            "text-lg": onlyIcon && size === "normal",
            "text-sm": onlyIcon && size === "small",
          })}
        />
      ) : null}
      {!onlyIcon ? (
        <span className={classNames({ "ml-2": icon })}>{label}</span>
      ) : null}
    </button>
  );
};

export default Button;
