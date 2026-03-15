import React from 'react';
import { Link } from 'react-router';

// Component for displaying vertical movie/show posters
const PosterCard = ({ id, posterUrl, title, releaseYear, className = '', showYearBadge = false }) => {
  return (
    <Link
      to={`/details/${id}`}
      className={`group relative flex flex-col w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)] hover:z-50 ${className}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-neutral-800 shadow-md">
        <img
          src={posterUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/5a5a5a?text=Aha';
          }}
          loading="lazy"
        />

        {showYearBadge && releaseYear && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-lg z-10">
            {releaseYear}
          </div>
        )}

        {/* Gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />

        {/* Text content absolute positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end">
          <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 drop-shadow-md">
            {title}
          </h3>
          {releaseYear && (
            <p className="text-xs text-neutral-300 font-medium mt-1">
              {releaseYear}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PosterCard;
