import { useEffect, useState } from 'react';
import Card from '../common/Card';
import FilterGroup from '../common/FilterGroup';
import SearchBox from '../common/SearchBox';

const Home = () => {
    const [items, setItems] = useState([]);
    const [originalItems, setOriginalItems] = useState([]);
    const [catFilters, setCatFilters] = useState<string[]>(['']);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const fetchItems = () => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setItems(json);
                setOriginalItems(json);
            })
            .catch((err) => console.error(err))
    };

    useEffect(() => {
        fetchItems();
    }, [])

    useEffect(() => {
        if (originalItems.length !== 0) {
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

    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-full p-4 bg-gray-900">
                <span className="flex gap-4 self-start">
                    <SearchBox onChange={({ currentTarget }) => handleSearchChange(currentTarget.value)} />
                    <button onClick={() => setShowFilters((show) => !show)}>
                        <i className="bi bi-filter mr-2 "></i>
                        Filters
                    </button>
                </span>
                {showFilters && (
                    <div className="mt-4">
                        <FilterGroup label="Category" filters={catFilters} />
                    </div>
                )}
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 w-full">
                {items.map((d, i) => (
                    <Card key={i} {...d} />
                ))}
            </div>
        </div>
    );
}

export default Home;