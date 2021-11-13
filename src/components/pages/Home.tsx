import { useEffect, useState } from 'react';
import Card from '../common/Card';
import ItemEntry from '../common/ItemEntry';
import FilterGroup from '../common/FilterGroup';
import SearchBox from '../common/SearchBox';
import Toggle from '../common/ViewToggle';

const Home = () => {
    const [items, setItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [catFilters, setCatFilters] = useState<string[]>(['']);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [view, setView] = useState<string>('list');

    const fetchItems = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setItems(json);
                setOriginalItems(json);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => { fetchItems(); }, [])

    useEffect(() => {
        if (originalItems.length !== 0) {
            console.log(originalItems);
            const cat = originalItems.map(({ category }) => category).filter((e, i, a) => a.indexOf(e) === i)
            setCatFilters(cat)
        }
    }, [originalItems]);

    const handleSearchChange = (keyword: string) => {
        if (keyword) {
            const result = [...items].filter((item) => Object.keys(item).some((key) => String(item[key]).match((new RegExp(keyword, 'i')))))
            setItems(result);
        } else {
            setItems(originalItems);
        }
    }

    // useEffect(() => {
    //     const x = originalItems.filter();
    // }, [activeFilters]);

    return (
        <div className="flex flex-col">
            <div className="sticky flex z-11 flex-col w-full top-16 p-5 bg-gray-900">
                <span className="flex flex-grow items-center justify-between">
                    <span className="flex gap-4">
                        <SearchBox onChange={(keyword) => handleSearchChange(keyword)} />
                        <button className="text-white" onClick={() => setShowFilters((show) => !show)}>
                            <i className="bi bi-filter mr-2 "></i>
                            Filters
                        </button>
                    </span>
                    <div>
                        <Toggle onChange={(v) => setView(v)} />
                    </div>
                </span>
                {showFilters && (
                    <div className="mt-4 flex flex-full gap-8">
                        <FilterGroup label="Categories" filters={catFilters} onFilterChange={(v) => setActiveFilters(v)} />
                    </div>
                )}
            </div>
            {view === 'grid' ? (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 w-full">
                    {items.map((d, i) => <Card key={i} {...d} />)}
                </div>
            ) : <div>{items.map((d, i) => <ItemEntry key={i} {...d} />)}</div>}
        </div>
    );
}

export default Home;