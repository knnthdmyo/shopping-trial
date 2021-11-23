import { ChangeEvent, useEffect, useState } from "react";

export interface IDropdown {
  name: string,
  value: (e: any) => void,
  options: string[],
  initialValue?: string,
  disabled?: boolean,
}

const Dropdown = ({ name, value, options, initialValue, disabled }: IDropdown) => {
  const [showOthers, setShowOthers] = useState(false);

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    if (target.value !== 'others') {
      setShowOthers(false)
      value(({ [target.name]: target.value }))
    } else {
      setShowOthers(true)
    }
  }

  const textChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    value(({ [target.name]: target.value }))
  };


  useEffect(() => { console.log(value); }, []);

  return (
    <span className="flex flex-col gap-1">
      <h6 className="capitalize text-sm">{name}</h6>
      <select
        disabled={disabled}
        className="border border-gray-500 border-2 rounded-lg py-1 px-2 w-full"
        defaultValue={initialValue}
        onChange={handleChange}
        name={name}
      >
        {[...options, 'others'].map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      {showOthers && <input name={name} disabled={disabled} onChange={textChange} className="border border-gray-500 border-2 py-1 px-2 rounded-lg w-full" placeholder="enter specific category" />}
    </span>
  );
}

export default Dropdown;