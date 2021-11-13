export interface IRatingIndicator {
    rate: number;
    count: number;
}

const RatingIndicator = ({ rate, count }: IRatingIndicator) => {
    return (
        <div className="flex flex-grow justify-between">
            <div>

                {new Array(Math.floor(rate)).fill((<i className="bi bi-star" />)).map((star) => star)}
            </div>
            <span className="text-sm">
                {`${count} reviews`}
            </span>
        </div >
    )
}

export default RatingIndicator;