import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { ValueType } from "../../types/Data";
import CardChart from "../CardChart/CardChart";
import { ColorName } from "tailwindcss/colors";

export type TCardType = "active" | "confirmed" | "recovered" | "deaths";

const options: Record<
  TCardType,
  {
    label: string;
    color: ColorName;
  }
> = {
  active: {
    label: "Aktywne",
    color: "yellow",
  },
  confirmed: {
    label: "Potwierdzone",
    color: "orange",
  },
  deaths: {
    label: "Zgony",
    color: "red",
  },
  recovered: {
    label: "Wyzdrowienia",
    color: "green",
  },
};

interface ICard {
  className?: string;
  type: TCardType;
  dailyValue: ValueType;
  icon: IconProp;
}

const Card: React.FC<ICard> = ({ type, dailyValue, className, icon }) => {
  const { color, label } = options[type];

  return (
    <div
      className={classNames(
        "relative p-4 bg-white shadow-lg rounded-md overflow-hidden",
        className
      )}
    >
      <div className="relative z-40">
        <div className="flex flex-row items-center font-bold text-gray-400">
          <FontAwesomeIcon
            icon={icon}
            className={classNames("text-xs", `text-${color}-400`)}
          />
          <span className="text-xs ml-2">{label}</span>
        </div>
        <div className="flex">
          <span className="text-2xl text-gray-800 font-bold">
            {dailyValue.value.toLocaleString()}
          </span>
          {dailyValue.growth ? (
            <div
              className={classNames("mt-1 ml-2 text-xs font-bold", {
                "text-green-600": dailyValue.growth > 0,
                "text-red-600": dailyValue.growth < 0,
              })}
            >
              <FontAwesomeIcon
                icon={dailyValue.growth > 0 ? "angle-up" : "angle-down"}
              />
              <span className="ml-1">
                {Math.abs(dailyValue.growth).toLocaleString()}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      {/* <div
        className={`absolute w-full h-1 top-0 left-0 bg-${color}-400 z-50`}
      /> */}
      <CardChart type={type} color={color} />
    </div>
  );
};

export default Card;
