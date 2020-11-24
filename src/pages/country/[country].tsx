import React from "react";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import { useCountryContext } from "../../contexts/Country";
import Layout from "../../layouts/Layout";
import { useSwipeable } from "react-swipeable";
import { NextPage } from "next";

interface Props {
  countryCode: string;
}

const Country: NextPage<Props> = ({ countryCode }) => {
  const {
    country,
    countryData,
    fetching,
    setPrevDayDate,
    setNextDayDate,
  } = useCountryContext();

  const handlers = useSwipeable({
    onSwipedLeft: () => country && setNextDayDate(),
    onSwipedRight: () => country && setPrevDayDate(),
  });

  return (
    <Layout title="COVID-19 Statystyki" swipeable={handlers}>
      <Search />
      {countryData && !fetching && (
        <div>
          <div className="mt-8 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
            <Card type="active" icon="virus" dailyValue={countryData.active} />
            <Card
              type="confirmed"
              icon="check-double"
              dailyValue={countryData.confirmed}
            />
            <Card
              type="deaths"
              icon="skull-crossbones"
              dailyValue={countryData.deaths}
            />
            <Card
              type="recovered"
              icon="virus-slash"
              dailyValue={countryData.recovered}
            />
          </div>
          <div className="mt-6 text-xs text-gray-600">
            Ostatnia aktualizacja danych:{" "}
            {countryData.updatedAt.format("hh:mm:ss")}
          </div>
        </div>
      )}
    </Layout>
  );
};

Country.getInitialProps = async ({ req, res }) => {
  const countryCode: string = req?.url ? req.url : "";
  return {
    countryCode,
  };
};

export default Country;
