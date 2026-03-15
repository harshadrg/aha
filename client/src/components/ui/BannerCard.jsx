import React from 'react';
import { Link } from 'react-router';

// Component for displaying horizontal banners/spotlights
const BannerCard = ({ id, bannerUrl, title, active = false, className = '' }) => {
  return (
    <Link 
      to={`/details/${id}`} 
      className={`group relative flex w-full overflow-hidden rounded-lg bg-neutral-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)] shadow-md ${active ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : ''} ${className}`}
    >
      <div className="relative aspect-video w-full">
        <img
          src={bannerUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/600x338/1a1a1a/5a5a5a?text=Aha';
          }}
          loading="lazy"
        />
        
        {/* Persistent bottom gradient for text readability (if we add text later) or just styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        
        {/* Optional title on hover for banner cards */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-bold text-white truncate drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default BannerCard;
