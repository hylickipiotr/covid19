import React from "react";
import { cardChartOpitons } from "./cardChartOptions";
import { TCardType } from "../Card/Card";
import Chart from "../Chart/Chart";
import { useCache } from "../../contexts/Cache";
import { useCountryContext } from "../../contexts/Country";
import { prepareChartData } from "./prepareChartData";
import colors, { ColorName } from "tailwindcss/colors";

interface ICardChart {
  type: TCardType;
  color: ColorName;
}

const CardChart: React.FC<ICardChart> = ({ type, color }) => {
  const { getItem } = useCache();
  const { country, date } = useCountryContext();

  const cachedCountryData = getItem(country?.iso2);

  if (!cachedCountryData) {
    return null;
  }

  const data = prepareChartData({
    type,
    date,
    countryData: cachedCountryData,
  });

  return (
    <div
      className="absolute h-full opacity-60 -bottom-1 md:-bottom-1.5"
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
