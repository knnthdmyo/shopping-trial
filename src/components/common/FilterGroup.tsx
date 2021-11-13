import { useEffect, useState } from 'react'

export interface IFilterGroup {
    label: string;
    filters: string[];
    onFilterChange?: (selected: string[]) => void;
}

const FilterGroup = ({ label, filters, onFilterChange }: IFilterGroup) => {
    const [selected, setSelected] = useState<{ label: string, checked: boolean }[]>([
        { label: '', checked: false }
    ]);

    useEffect(() => {
        setSelected(filters.map((filter) => ({ label: filter, checked: false })))
    }, [filters]);

    const handleOnChange = (position: number) => {
        const updatedCheckedState = selected.map((item, index) =>
            index === position ? ({ ...item, checked: !item.checked }) : item
        );
        setSelected(updatedCheckedState);
        const x = updatedCheckedState.filter(({ checked }) => checked).map(({ label }) => label);
        onFilterChange(x)
    };

    return (
        <div className="text-gray-500 flex flex-col divide-y gap-4">
            <span className="text-lg">
                {label}
            </span>
            <div className="flex flex-col gap-4">
                <ul>

                    {filters && selected.map((filter, index) => {
                        return (
                            <li key={index}>
                                <div className="toppings-list-item">
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
                                        <label className={filter.checked ? 'text-white' : 'text-gray-500'} htmlFor={`custom-checkbox-${index}`}>
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