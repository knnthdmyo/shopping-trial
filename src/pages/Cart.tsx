import { useContext, useEffect, useState } from 'react';
import ItemEntry from '../components/common/ItemEntry';
import Products from '../providers/store';
import { ProductTypes } from '../constants/types';

const Cart = () => {
  interface CartItems extends ProductTypes {
    quantity: number,
  };

  const { cart } = useContext(Products)
  const [displayedItems, setDisplayedItems] = useState<CartItems[]>([])

  useEffect(() => {
    const reduced: CartItems[] = cart
      .reduce((acc, cr, _i, a) => (
        [...acc, { ...cr, quantity: a.filter(({ title }) => title === cr.title).length }]
      ), []);

    const filtered = reduced
      .filter((e, i, a) => a
        .findIndex(({ title }) => e.title === title) === i)

    setDisplayedItems(filtered);
  }, [cart]);



  return (
    <div className='flex flex-col w-full gap-4'>
      {displayedItems.map((item, i) => <ItemEntry key={i} product={item} hideButton />)}
      <div className="flex flex-grow gap-4 sticky bottom-0 w-screen p-5 bg-white">
        <div className="self-end items-center flex gap-4 text-2xl text-gray-700">
          {`Total: $${cart.reduce((ac, { price }) => ac + Number(price), 0).toFixed(2)}`}
          <button className="ease-in-out transform hover:-translate-y-1 hover:shadow-2xl transition duration-500 bg-red-700 w-max text-white cursor-pointer px-4 py-2 rounded-lg text-sm">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div >
  );
}

export default Cart