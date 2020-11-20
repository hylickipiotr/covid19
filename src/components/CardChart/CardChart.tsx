import React from "react";
import { cardChartOpitons } from "./cardChartOptions";
import { TCardType } from "../Card/Card";
import Chart from "../Chart/Chart";
import { useCache } from "../../contexts/Cache";
import { useSearchContext } from "../Search/SearchContext";
import { prepareChartData } from "./prepareChartData";

interface ICardChart {
  type: TCardType;
  color: string;
}

const CardChart: React.FC<ICardChart> = ({ type, color }) => {
  const { getItem } = useCache();
  const { country, date } = useSearchContext();

  const cachedCountryData = getItem(country?.value);

  if (!cachedCountryData) {
    return null;
  }

  const data = prepareChartData({
    type,
    date,
    countryData: cachedCountryData,
  });

  return (
    <div className="card-chart-container">
      <Chart
        type="area"
        options={cardChartOpitons}
        series={[
          {
            data,
            color,
          },
        ]}
        height={100}
      />
    </div>
  );
};

export default CardChart;
