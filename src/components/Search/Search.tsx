import moment from "moment";
import React, { useState } from "react";
import Select, { ValueType } from "react-select";
import { MyCountry } from "../../types/MyCountry";
import { filterCountries } from "../../utils/filterCountries";
import { INPUT_DATE_FORMAT } from "../../utils/formatDateInput";
import Input from "../Input/Input";
import { useSearchContext } from "./SearchContext";

interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const { country, date, setDate, countries, setCountry } = useSearchContext();
  const [countryInput, setCountryInput] = useState("");

  const handleCountriesChange = async (country: ValueType<MyCountry>) => {
    if (!country) return;
    const { value } = country as MyCountry;
    setCountry(value);
  };

  const handleDateChante = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(moment(value, INPUT_DATE_FORMAT));
  };

  return (
    <div className="mt-4 w-full md:max-w-lg mx-auto grid grid-row grid-cols-3 gap-3">
      <Select
        inputId="country"
        className="col-span-6 md:col-span-2"
        placeholder="Który kraj cię interesuje?"
        options={countries}
        autoFocus={true}
        inputValue={countryInput}
        onInputChange={setCountryInput}
        filterOption={filterCountries}
        value={country}
        onChange={handleCountriesChange}
        isClearable
        blurInputOnSelect
      />
      <Input
        type="date"
        onChange={handleDateChante}
        value={date.format(INPUT_DATE_FORMAT)}
        max={moment().format(INPUT_DATE_FORMAT)}
        disabled={!country}
      />
    </div>
  );
};

export default Search;
