import { ProductTypes } from "../../constants/types";
import Chip from "./Chip";
import RatingIndicator from "./Rating";

export interface ICard {
  product: ProductTypes,
  onClick?: () => void,
}

const Card = ({ product, onClick }: ICard) => {
  const { title, description, category, image, rating, price } = product;
  return (
    <div className="flex gap-8 max-h-max items-center shadow-lg rounded-lg h-auto w-full md:w-full m-auto p-4">
      <img alt={`${image}-alt`} src={image} className="max-h-60 max-w-min w-full object-fit rounded-2xl" />
      <div className="flex flex-col gap-2 w-full">
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
        <button
          className="flex self-end gap-2 bg-red-400 hover:bg-red-500 pointer-cursor text-white px-3 py-2 border rounded-xl"
          onClick={onClick}
        >
          <i className="bi bi-cart-plus"></i>
          Add to cart
        </button>
      </div>
    </div>
  );
}
export default Card;