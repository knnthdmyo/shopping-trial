import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
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
  hideToggle?: boolean,
}

const Navbar = ({ handleToggleChange, hideFilterButton, hideToggle, handleSearch, filters, handleFilterChange }: INavbar) => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <span className="flex flex-col bg-gray-200 gap-0 sticky py-3 px-5 z-10 w-full top-16">
      <span className="flex sticky flex-grow gap-4 justify-between">
        <SearchBox onChange={(keyword) => handleSearch(keyword)} />
        {!hideFilterButton && (
          <button className="text-sm w-20" onClick={() => setShowFilters(!showFilters)}>
            <i className="bi bi-filter mr-2 "></i>
            Filters
          </button>
        )}
        <button className="w-20 text-sm" onClick={() => navigate(ROUTES.NEW_ITEM)}>
          New Item
        </button>
        {!hideToggle && <Toggle onChange={(v) => handleToggleChange(v)} />}
      </span>
      {showFilters && (
        <div className="mt-4 flex flex-full gap-8">
          <FilterGroup label="Categories" filters={filters} onFilterChange={(v) => handleFilterChange(v)} />
        </div>
      )}
    </span>
  )
}

export default Navbar;