import { FormEvent } from "react";


export interface ISearchBox {
  onChange?: (value: string) => void;
}

const SearchBox = ({ onChange }: ISearchBox) => {
  return (
    <div className="flex justify-content bg-white w-full px-3 rounded-xl relative mx-auto text-gray-600 border-2 border-gray-300 items-center">
      <input
        onChange={(e: FormEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
        className="bg-white focus:outline-none"
        type="search" name="search"
        placeholder="Search"
      />
    </div >
  )
}

export default SearchBox;