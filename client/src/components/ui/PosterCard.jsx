import React from 'react';
import { Link } from 'react-router';

// Component for displaying vertical movie/show posters
const PosterCard = ({ id, posterUrl, title, releaseYear, className = '' }) => {
  return (
    <Link 
      to={`/details/${id}`} 
      className={`group relative flex flex-col w-full transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)] hover:z-50 ${className}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-neutral-800 shadow-md">
        <img
          src={posterUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/5a5a5a?text=Aha';
          }}
          loading="lazy"
        />
        
        {/* Gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 opacity-80 group-hover:opacity-100" />
        
        {/* Text content absolute positioned at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
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
