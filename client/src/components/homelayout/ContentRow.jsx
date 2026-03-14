import React, { useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import PosterCard from '../ui/PosterCard';
import SectionHeader from '../common/SectionHeader';
import { ChevronLeft, ChevronRight } from '../ui/Icons';

const SIZE_CONFIG = {
  sm: { minWidth: 'w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px]' },
  md: { minWidth: 'w-[120px] sm:w-[130px] md:w-[140px] lg:w-[150px] xl:w-[160px]' },
  lg: { minWidth: 'w-[140px] sm:w-[150px] md:w-[160px] lg:w-[180px] xl:w-[200px]' },
};

const ContentRow = ({ title, endpoint, sectionKey, cardSize = 'md' }) => {
  const { data: fetchResponse, loading, error } = useFetch(endpoint);
  const data = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];
  const { minWidth } = SIZE_CONFIG[cardSize] ?? SIZE_CONFIG.md;

  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="mb-8">
        <SectionHeader title={title} sectionKey={sectionKey} showViewAll={true} />
        <div className="animate-pulse bg-neutral-800 h-[300px] w-full rounded-md flex items-center justify-center">
          Loading content...
        </div>
      </div>
    );
  }

  if (error || data.length === 0) return null;

  return (
    <div className="mb-8 relative group/row">
      <div className="px-4 md:px-0">
        <SectionHeader title={title} sectionKey={sectionKey} showViewAll={true} />
      </div>

      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hidden sm:flex -ml-4 shadow-lg border border-white/10"
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-nowrap gap-3 sm:gap-4 overflow-x-auto overflow-y-visible px-4 md:px-0 sm:pb-4 sm:pt-4 sm:-mt-4 sm:-mx-4 md:-mx-4 scrollbar-hide scroll-smooth"
      >
        {data.slice(0, 20).map((item) => (
          <div key={item._id} className={`shrink-0 ${minWidth}`}>
            <PosterCard
              id={item._id}
              posterUrl={item.poster_url || item.banner_url}
              title={item.title}
              releaseYear={item.release_year}
              cardSize={cardSize}
            />
          </div>
        ))}
      </div>

      {showRightArrow && data.length > 0 && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hidden sm:flex -mr-4 shadow-lg border border-white/10"
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>
  );
};

export default ContentRow;