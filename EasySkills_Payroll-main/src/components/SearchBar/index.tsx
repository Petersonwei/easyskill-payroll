import React from "react";
import FilterBox from "./FilterBox";
import SearchBarInput from "./SearchBarInput";

type SearchBarProps = {
  handlePageReset: (resetPage: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchKeywords: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ handlePageReset, onChange, searchKeywords }) => {
  return (
    <div className="mb-4 ml-6 flex gap-6">
      <SearchBarInput onChange={onChange} value={searchKeywords} />
      <FilterBox handlePageReset={handlePageReset} />
    </div>
  );
};

export default SearchBar;
