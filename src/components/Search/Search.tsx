import moment from "moment";
import React, { useState } from "react";
import Select, { ValueType } from "react-select";
import { useCache } from "../../contexts/Cache";
import { MyCountry } from "../../types/MyCountry";
import { filterCountries } from "../../utils/filterCountries";
import { INPUT_DATE_FORMAT } from "../../utils/formatDateInput";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useSearchContext } from "./SearchContext";

interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const cache = useCache();
  const { country, date, setDate, countries, setCountry } = useSearchContext();
  const [countryInput, setCountryInput] = useState("");

  const minDate = cache.getItem(country?.value)?.minDate;

  const isDisabledDateInput = !country || date.isSame(moment(), "day");
  const isDisabledPreviousDayButton = !country || date.isSame(minDate, "day");
  const isDisabledNextDayButton = !country || date.isSame(moment(), "day");

  const handleCountriesChange = async (country: ValueType<MyCountry>) => {
    if (!country) return;
    const { value } = country as MyCountry;
    setCountry(value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(moment(value, INPUT_DATE_FORMAT));
  };

  const handlePreviousDayClick = () => {
    setDate(moment(date).subtract(1, "day"));
  };

  const handleNextDayClick = () => {
    setDate(moment(date).add(1, "day"));
  };

  return (
    <div className="mt-4 w-full md:max-w-lg mx-auto flex flex-col gap-3">
      <div>
        <Select
          inputId="country"
          placeholder="Który kraj Cię interesuje?"
          noOptionsMessage={() => "Nie znaleziono takiego kraju"}
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
      </div>
      <div className="grid grid-cols-8 md:grid-cols-12 gap-1">
        <Button
          className="date-arrow-button col-span-1"
          label="Poprzedni dzień"
          icon="angle-left"
          onlyIcon
          variant="outline"
          color="gray"
          type="button"
          onClick={handlePreviousDayClick}
          disabled={isDisabledPreviousDayButton}
        />
        <Input
          className="col-span-4"
          type="date"
          onChange={handleDateChange}
          value={date.format(INPUT_DATE_FORMAT)}
          min={minDate?.format(INPUT_DATE_FORMAT)}
          max={moment().format(INPUT_DATE_FORMAT)}
          disabled={!country}
        />
        <Button
          className="date-arrow-button col-span-1"
          label="Następny dzień"
          icon="angle-right"
          onlyIcon
          variant="outline"
          color="gray"
          type="button"
          onClick={handleNextDayClick}
          disabled={isDisabledNextDayButton}
        />
        <Button
          className="col-span-2"
          label="Dziś"
          icon="calendar-day"
          color="blue"
          type="button"
          onClick={() => setDate(moment())}
          disabled={isDisabledDateInput}
        />
      </div>
    </div>
  );
};

export default Search;
