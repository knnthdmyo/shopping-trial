import { ProductTypes } from "../../constants/types";
import Chip from "./Chip";
import RatingIndicator from "./Rating";

export interface ICard {
  product: ProductTypes,
  onClick?: () => void,
  buttonLabel?: string,
}

const Card = ({ product, onClick, buttonLabel }: ICard) => {
  const { title, description, category, image, rating, price } = product;
  return (
    <div className="flex flex-col gap-8 max-h-max shadow-lg rounded-lg h-auto w-80 md:w-80 m-auto p-4">
      <img alt={`${image}-alt`} src={image} className="max-h-60 w-full object-cover rounded-2xl" />
      <div className="flex flex-col gap-2 w-full">
        <p className="truncate text-indigo-500 text-md font-medium">
          {title}
        </p>
        <RatingIndicator {...rating} />
        {category && <Chip tags={category} />}
        <p className="line-clam-3 flex overflow-hidden text-gray-600 dark:text-gray-300 font-light text-md">
          {description}
        </p>
      </div>
      <div className="flex w-full justify-between items-center gap-2">
        <span>
          {`$ ${price}`}
        </span>
        <button
          className="flex gap-2 bg-red-400 hover:bg-red-500 pointer-cursor text-white px-3 py-2 border rounded-xl"
          onClick={onClick}
        >
          <i className="bi bi-cart-plus"></i>
          {buttonLabel || 'add to cart'}
        </button>
      </div>
    </div>
  );
}
export default Card;