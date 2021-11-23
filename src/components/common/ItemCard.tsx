import { ProductTypes } from "../../constants/types";
import DefaultImage from '../../assets/images/default-image.png';
import Chip from "./Chip";
import RatingIndicator from "./Rating";

export interface ICard {
  product: ProductTypes,
  onAdd?: () => void,
  onDelete?: () => void,
  onEdit?: () => void,
  buttonLabel?: string,
}

const Card = ({ product, buttonLabel, onAdd, onDelete, onEdit }: ICard) => {
  const { title, description, category, image, rating, price } = product;
  return (
    <div className="flex flex-col gap-8 max-h-max shadow-lg rounded-lg h-auto w-80 md:w-80 m-auto p-4">
      {image
        ? (<img alt={`${image}-alt`} src={image} className="max-h-60 w-full object-cover rounded-2xl" />)
        : (<img alt="default" src={DefaultImage} className="max-h-60 w-full object-cover rounded-2xl" />)}

      <div className="flex flex-col gap-2 w-full">
        <p className="truncate text-indigo-500 text-md font-medium">
          {title || 'no name provided'}
        </p>
        <span className="divide-x-2 divide-gray-600 divide-2 self-end">
          <button className="uppercase text-xs text-gray font-bold px-1" onClick={onEdit}>
            edit
          </button>
          <button className="uppercase text-xs text-gray font-bold px-1" onClick={onDelete}>
            delete
          </button>
        </span>
        {rating ? <RatingIndicator {...rating} /> : <span>No reviews</span>}
        {category && <Chip tags={category} />}
        <p className="line-clam-3 flex overflow-hidden text-gray-600 dark:text-gray-300 font-light text-md">
          {description}
        </p>
      </div>
      <div className="flex w-full justify-between items-center gap-2">
        {`$ ${Number(price).toFixed(2)}`}
        <button
          className="flex ease-in-out transform hover:-translate-y-1 hover:shadow-3xl transition duration-500 gap-2 bg-red-500 hover:bg-red-600 pointer-cursor text-white px-3 py-2 border rounded-xl"
          onClick={onAdd}
        >
          <i className="bi bi-cart-plus"></i>
          {buttonLabel || 'add to cart'}
        </button>
      </div>
    </div>
  );
}
export default Card;