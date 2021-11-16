import { ProductTypes } from '../../constants/types';
import Chip from "./Chip";
import RatingIndicator from "./Rating";

export interface ICard {
  product: CartItems,
  onAdd?: () => void,
  onDelete?: () => void,
  onEdit?: () => void,
  buttonLabel?: string,
  hideButton?: boolean,
}

interface CartItems extends ProductTypes {
  quantity?: number,
};

const Card = ({ product, onAdd, buttonLabel, hideButton, onDelete, onEdit }: ICard) => {
  const { title, description, category, image, rating, price } = product;
  return (
    <div className="z-1 flex gap-8 max-h-max items-center bg-white shadow-lg rounded-lg w-full md:w-full p-5">
      <img alt={`${image}-alt`} src={image} className="max-h-60 max-w-min w-full object-fit rounded-2xl" />
      <div className="flex flex-col gap-2 w-full">
        {product.quantity && (
          <span className="self-end text-lg text-indigo-600 mb-2">
            {`Quantity ${product.quantity}`}
          </span>
        )}
        <span className="divide-x-2 divide-gray-600 divide-2 self-end">
          <button className="uppercase text-xs text-gray font-bold px-1" onClick={onEdit}>
            edit
          </button>
          <button className="uppercase text-xs text-gray font-bold px-1" onClick={onDelete}>
            delete
          </button>
        </span>
        <p className="flex items-center justify-between text-indigo-500 text-md font-medium">
          {title}
          <span>
            {`$ ${price}`}
          </span>
        </p>
        <RatingIndicator {...rating} />
        {category && <Chip tags={category} />}
        <p className="flex flex-wrap overflow-ellipsis overflow-hidden text-gray-600 dark:text-gray-300 font-light text-md">
          {description}
        </p>
        {!hideButton && (
          <button
            className="flex self-end gap-2 bg-red-400 hover:bg-red-500 pointer-cursor text-white px-3 py-2 border rounded-xl"
            onClick={onAdd}
          >
            <i className="bi bi-cart-plus"></i>
            {buttonLabel || 'add to cart'}
          </button>
        )}
      </div>
    </div>
  );
}
export default Card;