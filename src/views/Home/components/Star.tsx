const Star = ({ filled }: { filled?: boolean }) => {
    // Use '★' for a filled star and '☆' for an empty star
    const starSymbol = filled ? '★' : '☆';

    return (
        <span className='text-3xl md:text-4xl' style={{ color: filled ? '#FFD700' : '#dcdcdc' }}>
            {starSymbol}
        </span>
    );
}

export default Star;
