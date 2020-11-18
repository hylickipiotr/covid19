import React from "react";
import Card from "../components/Card/Card";
import Search from "../components/Search/Search";
import { useSearchContext } from "../components/Search/SearchContext";
import Layout from "../layouts/Layout";

const IndexPage = () => {
  const { countryData, fetching } = useSearchContext();

  return (
    <Layout title="Covid-19 Statystyki">
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
              type="death"
              icon="skull-crossbones"
              dailyValue={countryData.deaths}
            />
            <Card
              type="recoverd"
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

export default IndexPage;
