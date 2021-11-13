import Chip from "./Chip";

export interface ICard {
    title: string;
    category: string;
    description?: string;
    image: string,
}

const Card = ({ title, description, category, image }: ICard) => {
    return (
        <div className="flex flex-col gap-4 max-h-max gap-4 overflow-hidden shadow-lg rounded-lg h-auto w-80 md:w-80 m-auto p-4 bg-indigo-50 ">
            <img alt={`${image}-alt`} src={image} className="max-h-60 w-full object-cover rounded-2xl" />
            <div className="w-full">
                <p className="truncate text-indigo-500 text-md font-medium">
                    {title}
                </p>
                {category && <Chip tags={category} />}

                <p className="flex flex-wrap overflow-ellipsis overflow-hidden text-gray-600 dark:text-gray-300 font-light text-md">
                    {description}
                </p>
            </div>
            <div className="flex self-end gap-2">
                <button className="flex gap-2 bg-blue-400 hover:bg-blue-500 pointer-cursor text-white px-3 py-2 border rounded-xl" onClick={() => alert('clicked')}>
                    <i className="bi bi-eye"></i>
                    View
                </button>
                <button className="flex gap-2 bg-blue-400 hover:bg-blue-500 pointer-cursor text-white px-3 py-2 border rounded-xl" onClick={() => alert('clicked')}>
                    <i className="bi bi-cart-plus"></i>
                    Add to cart
                </button>
            </div>
        </div>
    );
}
export default Card;