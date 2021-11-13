import Chip from "./Chip";
import RatingIndicator from "./Rating";

export interface ICard {
    title: string;
    category: string;
    description?: string;
    image: string,
    rating: { rate: number, count: number },
    price: number,
}

const Card = ({ title, description, category, image, rating, price }: ICard) => {
    return (
        <div className="flex flex-col gap-8 max-h-max shadow-lg rounded-lg h-auto w-80 md:w-80 m-auto p-4">
            <img alt={`${image}-alt`} src={image} className="max-h-60 w-full object-cover rounded-2xl" />
            <div className="flex flex-col gap-2 w-full">
                <p className="truncate text-indigo-500 text-md font-medium">
                    {title}
                </p>
                <RatingIndicator {...rating} />
                {category && <Chip tags={category} />}
                <p className="flex flex-wrap overflow-ellipsis overflow-hidden text-gray-600 dark:text-gray-300 font-light text-md">
                    {description}
                </p>
            </div>
            <div className="flex w-full justify-between items-center gap-2">
                <span>
                    {`$ ${price}`}
                </span>
                <button
                    className="flex gap-2 bg-red-400 hover:bg-red-500 pointer-cursor text-white px-3 py-2 border rounded-xl"
                    onClick={() => alert('clicked')}
                >
                    <i className="bi bi-cart-plus"></i>
                    Add to cart
                </button>
            </div>
        </div>
    );
}
export default Card;