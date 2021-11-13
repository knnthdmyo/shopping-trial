import { useEffect, useState } from 'react'

export interface IFilterGroup {
    label: string;
    filters: string[] | number[];
    onFilterChange?: (values: string[]) => void;
}

const FilterGroup = ({ label, filters, onFilterChange }: IFilterGroup) => {
    const [selected, setSelected] = useState<{ label: string, checked: boolean }[]>([
        { label: '', checked: false }
    ]);

    useEffect(() => { setSelected(filters.map((filter) => ({ label: String(filter), checked: false }))) }, [filters]);

    const handleOnChange = (position: number) => {
        const updatedCheckedState = selected.map((item, index) =>
            index === position ? ({ ...item, checked: !item.checked }) : item
        );
        setSelected(updatedCheckedState);
        const selectedFilters = updatedCheckedState.filter(({ checked }) => checked).map(({ label }) => label);
        onFilterChange(selectedFilters)
    };

    return (
        <div className="text-gray-500 flex flex-col w-max gap-4">
            <span className="text-lg">
                {label}
            </span>
            <div className="border-t w-full" />
            <div className="flex flex-col gap-4">
                <ul>
                    {filters && selected.map((filter, index) => {
                        return (
                            <li key={index}>
                                <div className="filters">
                                    <div className="left-section">
                                        <input
                                            className="hidden"
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={filter.label}
                                            value={filter.label}
                                            checked={filter.checked}
                                            onChange={() => handleOnChange(index)}
                                        />
                                        <label className={`capitalize cursor-pointer ${filter.checked ? 'text-white' : 'text-gray-500'}`} htmlFor={`custom-checkbox-${index}`}>
                                            {filter.label}
                                        </label>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default FilterGroup;