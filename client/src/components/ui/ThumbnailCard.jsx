import React from 'react';

const ThumbnailCard = ({
    title,
    thumbnailUrl,
    className = '',
}) => {
    return (
        <div className={`relative aspect-video w-full overflow-hidden rounded-md shadow-md ${className}`}>
            <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 drop-shadow-2xl"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/350x197/1a1a1a/5a5a5a?text=Aha';
                    e.target.className = 'absolute inset-0 w-full h-full object-cover';
                }}
                loading="lazy"
            />
        </div>
    );
};

export default ThumbnailCard;