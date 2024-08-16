
const Star = ({ filled, half }: { filled: boolean; half?: boolean }) => {
    let starSymbol = '☆' // Empty star by default

    if (filled) {
        starSymbol = '★' // Full star
    } else if (half) {
        starSymbol = '★' // Using the same symbol for both full and half stars, but style it differently
    }

    return (
        <span className='text-3xl md:text4xl relative inline-block' style={{color: filled || half ? '#FFD700' : '#dcdcdc'}}
        >
            {half && !filled && (
                <span className='absolute w-1/2 overflow-hidden inline-block whitespace-nowrap top-0 left-0 text-3xl md: text-4xl' style={{color: '#dcdcdc'}}
                >
                    ★
                </span>
            )}
            {starSymbol}
        </span>
    )
}

export default Star
