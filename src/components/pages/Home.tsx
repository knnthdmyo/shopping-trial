import { useEffect, useState } from 'react';
import Card from '../common/Card';
import ItemEntry from '../common/ItemEntry';
import FilterGroup from '../common/FilterGroup';
import SearchBox from '../common/SearchBox';
import Toggle from '../common/ViewToggle';
import ItemLoader from '../common/ItemLoader';
import { is_empty } from '../../utils/objectHelpers';
import { ProductTypes } from '../../constants/types';

const Home = () => {
    const [items, setItems] = useState<ProductTypes[]>([]);
    const [originalItems, setOriginalItems] = useState<ProductTypes[]>([]);
    const [catFilters, setCatFilters] = useState<string[]>(['']);
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
            const result = items.filter((item) => Object.keys(item).some((key: string) => (item: Record<string, any>) => String(item[key]).match((new RegExp(keyword, 'i')))))
            setItems(result);
        } else {
            setItems(originalItems);
        }
    }

    const handleFilterChange = (filters: string[]) => {
        if (!is_empty(filters)) {
            const filtered = originalItems.filter(({ category }) => filters.includes(category));
            setItems(filtered);
        } else {
            setItems(originalItems);
        }
    }

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
                        {showFilters && (
                            <button
                                className="text-white"
                                onClick={() => {
                                    setItems(originalItems);
                                    setShowFilters(false);
                                }}
                            >
                                <i className="bi bi-arrow-counterclockwise mr-2" />
                                Clear Filters
                            </button>
                        )}
                    </span>
                    <div>
                        <Toggle onChange={(v) => setView(v)} />
                    </div>
                </span>
                {showFilters && (
                    <div className="mt-4 flex flex-full gap-8">
                        <FilterGroup label="Categories" filters={catFilters} onFilterChange={(v) => handleFilterChange(v)} />
                    </div>
                )}
            </div>
            {items.length !== 0
                ? (
                    view === 'grid' ? (
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 w-full">
                            {items.map((d, i) => <Card key={i} {...d} />)}
                        </div>
                    ) : <div>{items.map((d, i) => <ItemEntry key={i} {...d} />)}</div>
                ) : <ItemLoader items={20} />
            }

        </div>
    );
}

export default Home;