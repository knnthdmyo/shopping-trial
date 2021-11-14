import SearchBox from "./SearchBox";
import FilterGroup from "./FilterGroup";
import Toggle from "./ViewToggle";
import { useState } from "react";

export interface INavbar {
  handleSearch: (keyword: string) => void,
  handleToggleChange: (v: string) => void,
  filters?: string[],
  handleFilterChange?: (f: string[]) => void,
  hideFilterButton?: boolean,
}

const Navbar = ({ handleToggleChange, hideFilterButton, handleSearch, filters, handleFilterChange }: INavbar) => {

  const [showFilters, setShowFilters] = useState(false);

  return (
    <span className="sticky bg-blue-200 p-5 z-11 w-full top-20 flex flex-grow items-center justify-between">
      <span className="flex gap-4">
        <SearchBox onChange={(keyword) => handleSearch(keyword)} />
        {!hideFilterButton && (
          <button className="text-white" onClick={() => setShowFilters(!showFilters)}>
            <i className="bi bi-filter mr-2 "></i>
            Filters
          </button>
        )}
      </span>
      <div>
        <Toggle onChange={(v) => handleToggleChange(v)} />
      </div>
      {showFilters && (
        <div className="mt-4 flex flex-full gap-8">
          <FilterGroup label="Categories" filters={filters} onFilterChange={(v) => handleFilterChange(v)} />
        </div>
      )}
    </span>
  )
}

export default Navbar;