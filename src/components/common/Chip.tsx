export interface IChip {
    tags: string | string[];
}

const Chip = ({ tags }: IChip) => {
    return (
        <div className="flex flex-grow max-h-min gap-2">
            Tags:
            {Array.isArray(tags) ? (
                tags.map((tag) => (
                    <span className='text-xs px-2 py-1 capitalize border rounded-2xl bg-gray-200'>
                        {`${tag}`}
                    </span>
                ))
            ) : (
                <span className='text-xs px-2 py-1 capitalize border rounded-2xl bg-gray-200'>
                    {`${tags}`}
                </span>
            )}
        </div >
    )
}

export default Chip;