import { useState } from "react";

const Toggle = ({ onChange }: { onChange: (value: boolean | string) => void }) => {
    const [view, setView] = useState<string>('list');

    const handleOnChange = (v: string) => {
        setView(v);
        onChange(v)
    }

    return (
        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-xl inline-flex">
            <button onClick={() => handleOnChange('list')} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${view === 'list' && 'text-blue-400'} rounded-l-full px-2 py-2 active`} id="grid">
                <i className="bi bi-list" />
            </button>
            <button onClick={() => handleOnChange('grid')} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 ${view === 'grid' && 'text-blue-400'} rounded-r-full px-2 py-2`} id="list">
                <i className="bi bi-grid-3x3-gap-fill" />
            </button>
        </div>
    )
}

export default Toggle;