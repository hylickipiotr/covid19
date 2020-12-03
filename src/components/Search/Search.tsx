import moment from "moment";
import React, { useState } from "react";
import Select, { ValueType } from "react-select";
import { COUNTRIES } from "../../constants/countries";
import { useSearch } from "../../contexts/Search/Search";
import { Country } from "../../types/Country";
import { filterCountries } from "../../utils/filterCountries";
import { INPUT_DATE_FORMAT } from "../../utils/formatDateInput";
import Button from "../Button/Button";
import Input from "../Input/Input";
import SelectControl from "./SelectControl";

interface ISearch {}

const Search: React.FC<ISearch> = () => {
  const [
    { country, date, cache },
    { setCountryCode, setDate, setPrevDayDate, setNextDayDate, forceRefetch },
  ] = useSearch();
  const [countryInput, setCountryInput] = useState("");

  const minDate =
    country && cache && cache[country.iso2] && cache[country.iso2].minDate;

  const isDisabledDateInput =
    date && (!country || date.isSame(moment(), "day"));
  const isDisabledPreviousDayButton =
    date && (!country || date.isSame(minDate, "day"));
  const isDisabledNextDayButton =
    date && (!country || date.isSame(moment(), "day"));

  const handleCountriesChange = async (country: ValueType<Country>) => {
    if (!country) return;
    const { iso2 } = country as Country;
    setCountryCode(iso2);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDate(moment(value, INPUT_DATE_FORMAT));
  };

  const handlePreviousDayClick = () => {
    setPrevDayDate();
  };

  const handleNextDayClick = () => {
    setNextDayDate();
  };

  return (
    <div className="mt-4 w-full md:max-w-lg mx-auto flex flex-col gap-3 relative z-50">
      <div className="flex gap-1">
        <Select
          className="flex-1"
          inputId="country"
          placeholder="Który kraj Cię interesuje?"
          noOptionsMessage={() => "Nie znaleziono takiego kraju"}
          options={Object.values(COUNTRIES)}
          getOptionLabel={({ name_pl }) => name_pl}
          getOptionValue={({ iso2 }) => iso2}
          autoFocus={true}
          inputValue={countryInput}
          onInputChange={setCountryInput}
          filterOption={filterCountries}
          value={country}
          onChange={handleCountriesChange}
          blurInputOnSelect
          components={{
            Control: SelectControl,
          }}
        />
        <Button
          color="blue"
          label="Odśwież"
          icon="sync-alt"
          onlyIcon
          type="button"
          onClick={() => forceRefetch()}
        />
      </div>
      <div className="flex gap-1">
        <Button
          className="date-arrow-button"
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
          type="date"
          onChange={handleDateChange}
          value={date ? date.format(INPUT_DATE_FORMAT) : ""}
          min={minDate?.format(INPUT_DATE_FORMAT)}
          max={moment().format(INPUT_DATE_FORMAT)}
          disabled={!country}
        />
        <Button
          className="date-arrow-button"
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
