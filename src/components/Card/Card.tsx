import React from "react";

type TCardType = "active" | "confirmed" | "recoverd" | "death";

const options: Record<
  TCardType,
  {
    label: string;
    color: string;
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
  death: {
    label: "Zgony",
    color: "red",
  },
  recoverd: {
    label: "Wyzdrowienia",
    color: "green",
  },
};

interface ICard {
  className?: string;
  type: TCardType;
  value: number;
}

const Card: React.FC<ICard> = ({ type, value, className }) => {
  const { color, label } = options[type];
  return (
    <div
      className={[
        "relative p-4 bg-white shadow-xl rounded-lg overflow-hidden",
        className,
      ].join(" ")}
    >
      <span className="block text-sm font-bold text-gray-500">{label}</span>
      <span className="block text-2xl text-gray-800 font-bold">
        {value.toLocaleString()}
      </span>
      <div className={`absolute w-full h-2 bottom-0 left-0 bg-${color}-400`} />
    </div>
  );
};

export default Card;
