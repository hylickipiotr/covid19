import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { ValueType } from "../../types/Data";
import CardChart from "../CardChart/CardChart";

export type TCardType = "active" | "confirmed" | "recovered" | "deaths";

const options: Record<
  TCardType,
  {
    label: string;
    color: string;
    chartColor: string;
  }
> = {
  active: {
    label: "Aktywne",
    color: "yellow",
    chartColor: "#f6e05e",
  },
  confirmed: {
    label: "Potwierdzone",
    color: "orange",
    chartColor: "#f6ad55",
  },
  deaths: {
    label: "Zgony",
    color: "red",
    chartColor: "#fc8181",
  },
  recovered: {
    label: "Wyzdrowienia",
    color: "green",
    chartColor: "#68d391",
  },
};

interface ICard {
  className?: string;
  type: TCardType;
  dailyValue: ValueType;
  icon: IconProp;
}

const Card: React.FC<ICard> = ({ type, dailyValue, className, icon }) => {
  const { color, label, chartColor } = options[type];

  return (
    <div
      className={classNames(
        "relative p-4 bg-white shadow-lg rounded-md overflow-hidden",
        className
      )}
    >
      <div className="relative z-40">
        <div className="flex flex-row items-center font-bold text-gray-500">
          <FontAwesomeIcon
            icon={icon}
            className={classNames("text-xs", `text-${color}-500`)}
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
      <CardChart type={type} color={chartColor} />
    </div>
  );
};

export default Card;
