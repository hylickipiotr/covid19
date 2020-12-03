import React from "react";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import Layout from "../../layouts/Layout";
import { useSwipeable } from "react-swipeable";
import { NextPage } from "next";
import { useSearch } from "../../contexts/Search/Search";
import { isToday } from "../../utils/isToday";
import CardSkeleton from "../../components/Card/Card.skeleton";

interface Props {
  countryCode: string;
}

const Country: NextPage<Props> = ({ countryCode }) => {
  const [
    { country, result: countryData, isFetching },
    { setPrevDayDate, setNextDayDate },
  ] = useSearch();

  const handlers = useSwipeable({
    onSwipedLeft: () => country && setNextDayDate(),
    onSwipedRight: () => country && setPrevDayDate(),
  });

  return (
    <Layout
      title={`COVID-19 Statystyki${country ? " | " + country.name_pl : ""}`}
      swipeable={handlers}
    >
      <Search />
      {countryData && !isFetching ? (
        <div>
          <div className="mt-8 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
            <Card
              type="confirmed"
              icon="check-double"
              dailyValue={countryData.confirmed}
            />
            <Card type="active" icon="virus" dailyValue={countryData.active} />
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
          {isToday(countryData.updatedAt) ? (
            <div className="mt-6 text-xs text-gray-500">
              Aktualizacja danych: {countryData.updatedAt.format("HH:mm")}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-8 grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
          {Array.from({ length: 4 }).map(() => (
            <CardSkeleton />
          ))}
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
