import { useEffect, useState, useContext } from 'react';
import Products from '../../providers/store';
import Card from '../common/Card';
import ItemEntry from '../common/ItemEntry';
import Navbar from '../common/Navbar';
import ItemLoader from '../common/ItemLoader';
import { is_empty } from '../../utils/objectHelpers';
import { ProductTypes } from '../../constants/types';

const Shop = () => {
  const { products, updateCart, cart } = useContext(Products);
  const [items, setItems] = useState<ProductTypes[]>([]);
  const [catFilters, setCatFilters] = useState<string[]>(['']);
  const [view, setView] = useState<string>('list');
  const [selectedProducts, setSelectedProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    setItems(products);
    setSelectedProducts(cart)
  }, [products])

  useEffect(() => {
    if (products.length !== 0) {
      const cat = products.map(({ category }) => category).filter((e, i, a) => a.indexOf(e) === i)
      setCatFilters(cat)
    }
  }, [products]);

  const handleSearchChange = (keyword: string) => {
    if (keyword) {
      const result = products.filter((item) => Object.keys(item).some((key: string) => (item: Record<string, any>) => String(item[key]).match((new RegExp(keyword, 'i')))))
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

  const handleProductClick = (product: ProductTypes) => {
    setSelectedProducts((prev) => [...prev, product]);
  }

  useEffect(() => {
    updateCart(selectedProducts)
  }, [selectedProducts]);

  return (
    <div className="flex flex-col">
      <Navbar
        handleSearch={(word) => handleSearchChange(word)}
        handleToggleChange={(v) => setView(v)}
        filters={catFilters}
        handleFilterChange={(f) => handleFilterChange(f)}
      />
      {items.length !== 0
        ? (
          view === 'grid' ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8 w-full">
              {items.map((d, i) => <Card key={i} onClick={() => handleProductClick(d)} product={d} />)}
            </div>
          ) : <div>{items.map((d, i) => <ItemEntry key={i} onClick={() => handleProductClick(d)} product={d} />)}</div>
        ) : <ItemLoader items={20} />
      }
    </div>
  );
}

export default Shop;