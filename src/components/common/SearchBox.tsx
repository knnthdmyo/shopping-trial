import { FormEvent } from "react";


export interface ISearchBox {
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ onChange }: ISearchBox) => {
    return (
        <div className="flex w-min py-1 px-3 rounded-2xl relative mx-auto text-gray-600 border-2 border-gray-300 items-center">
            <input onChange={onChange}
                className="bg-white text-sm focus:outline-none"
                type="search" name="search"
                placeholder="Search"
            />
            <button type="submit">
                <i className="bi bi-search"></i>
            </button>
        </div >
    )
}

export default SearchBox;