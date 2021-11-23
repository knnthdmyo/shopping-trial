import { Fragment } from "react";

const ItemLoader = ({ items }: { items: number }) => {
  return (
    <Fragment>
      {new Array(items).fill(null)
        .map((_, i) => (
          <div key={i} className="flex gap-8 p-8 bg-white p-4 rounded-md shadow">
            <div className="w-64 h-44 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="mt-8 h-32 w-full space-y-3">
              <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-full h-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
    </Fragment>

  )
}

export default ItemLoader;