import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../providers/store';
import ItemCard from '../components/common/ItemCard';
import ItemEntry from '../components/common/ItemEntry';
import Navbar from '../components/common/Navbar';
import ItemLoader from '../components/common/ItemLoader';
import * as ROUTES from '../constants/routes';
import { is_empty } from '../utils/objectHelpers';
import { ProductTypes } from '../constants/types';

const Shop = () => {
  const navigate = useNavigate();
  const { products, cart_add, cart, delete: _delete } = useContext(Products);
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [catFilters, setCatFilters] = useState<string[]>(['']);
  const [view, setView] = useState<string>('list');

  useEffect(() => { setItems(products.reverse()) }, [products])

  useEffect(() => {
    if (products.length !== 0) {
      const cat = products.map(({ category }) => category).filter((e, i, a) => a.indexOf(e) === i)
      setCatFilters(cat)
    }
  }, [products]);

  const handleSearchChange = (keyword: string) => {
    if (keyword) {
      const result = products
        .filter((item) => Object.keys(item)
          .some((key: string) => String(item[key]).match((new RegExp(keyword, 'i')))))

      console.log(result);
      setItems(result);
    } else {
      setItems(products);
    }
  }

  const handleFilterChange = (filters: string[]) => {
    if (!is_empty(filters)) {
      const filtered = products.filter(({ category }) => filters.includes(category));
      setItems(filtered);
    } else {
      setItems(products);
    }
  }

  return (
    <div className="flex flex-col">
      <Navbar
        handleSearch={(word) => handleSearchChange(word)}
        handleToggleChange={(v) => setView(v)}
        filters={catFilters}
        handleFilterChange={(f) => handleFilterChange(f)}
      />
      {!is_empty(items)
        ? (
          view === 'grid' ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 w-full">
              {items.map((item, i) => (
                <ItemCard
                  key={i}
                  product={item}
                  onEdit={() => navigate(ROUTES.NEW_ITEM, { state: { ...item } })}
                  onAdd={() => cart_add([...cart, item])}
                  onDelete={() => _delete(item)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <ItemEntry
                  key={i}
                  product={item}
                  onEdit={() => navigate(ROUTES.NEW_ITEM, { state: { ...item } })}
                  onAdd={() => cart_add([...cart, item])}
                  onDelete={() => _delete(item)}
                />
              ))}
            </div>
          )
        ) : <ItemLoader items={20} />
      }
    </div>
  );
}

export default Shop;