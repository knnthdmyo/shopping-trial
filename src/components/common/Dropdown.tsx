import { ChangeEvent, useEffect, useState } from "react";

export interface IDropdown {
  name: string,
  value: (e: any) => void,
  options: string[],
  initialValue?: string,
}

const Dropdown = ({ name, value, options, initialValue }: IDropdown) => {
  const [inputValue, setInputValue] = useState('');
  const [showOthers, setShowOthers] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (e.target.value !== 'others') {
      setShowOthers(false)
      setInputValue(e.target.value)
    } else {
      setShowOthers(true)
    }
  }

  const textChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  useEffect(() => {
    value({ [name]: inputValue });
  }, [name, inputValue]);

  return (
    <span className="flex flex-col gap-1">
      <h6 className="capitalize text-sm">{name}</h6>
      <select className="border py-1 px-2 rounded-lg border-2 w-full" defaultValue={initialValue} onChange={handleChange}>
        {[...options, 'others'].map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
      {showOthers && <input onChange={textChange} className="border py-1 px-2 rounded-lg border-2 w-full" placeholder="enter specific category" />}
    </span>
  );
}

export default Dropdown;