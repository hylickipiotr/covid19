import React from "react";
import { cardHeight } from "./Card";

const CardSkeleton: React.FC<{}> = ({}) => {
  return (
    <div
      className="bg-gray-200 rounded-md animate-pulse p-4"
      style={{ height: cardHeight }}
    >
      <div className="bg-gray-100 h-4 w-3/5" />
      <div className="bg-gray-100 h-7 w-2/5 mt-2"></div>
    </div>
  );
};

export default CardSkeleton;
