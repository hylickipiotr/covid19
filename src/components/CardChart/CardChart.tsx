import React from "react";
import { cardChartOpitons } from "./cardChartOptions";
import { TCardType } from "../Card/Card";
import Chart from "../Chart/Chart";
import { prepareChartData } from "./prepareChartData";
import colors, { ColorName } from "tailwindcss/colors";
import { useSearch } from "../../contexts/Search/Search";

interface ICardChart {
  type: TCardType;
  color: ColorName;
}

const CardChart: React.FC<ICardChart> = ({ type, color }) => {
  const [{ cache, country, date }] = useSearch();

  const countryData = cache && country && cache[country.iso2];

  if (!countryData || !date) {
    return null;
  }

  const data = prepareChartData({
    type,
    date,
    countryData: countryData,
  });

  return (
    <div
      className="absolute h-full opacity-60 -bottom-1.5 md:-bottom-1.5"
      style={{
        width: "calc(100% + 32px)",
        left: "-22px",
      }}
    >
      <Chart
        type="area"
        options={cardChartOpitons}
        series={[
          {
            data,
            color: colors[color][400],
          },
        ]}
        height={100}
      />
    </div>
  );
};

export default CardChart;
