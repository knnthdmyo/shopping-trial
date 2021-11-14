export interface IRatingIndicator {
    rate: number;
    count: number;
}

const RatingIndicator = ({ rate, count }: IRatingIndicator) => {
    return (
        <div className="flex flex-grow justify-between">
            <div>
                {new Array(Math.floor(rate)).fill(null).map((_, i) => <i key={i} className="bi bi-star" />)}
            </div>
            <span className="text-sm">
                {`${count} reviews`}
            </span>
        </div >
    )
}

export default RatingIndicator;