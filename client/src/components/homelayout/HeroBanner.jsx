import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import useFetch from '../../hooks/useFetch';
// import { SkeletonHero } from '../common/Skeletons'; // Re-implementing skeleton later if needed

const HeroBanner = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  // Use the established hook structure instead of undefined `fetchData`
  const { data: fetchResponse, loading, error } = useFetch('/api/contents?sort=popularity');

  // Clean up data response
  const responseData = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  // Stable primitive dep to avoid re-render loop on every render
  const responseLength = responseData.length;

  useEffect(() => {
    if (responseData.length > 0) {
      setSlides(responseData.slice(0, 5));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseLength]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) return <div className="h-[70vh] bg-neutral-800 animate-pulse flex items-center justify-center">Loading Hero...</div>; // Replacing SkeletonHero temporarily
  if (error) return <div className="h-[70vh] bg-neutral-900 flex items-center justify-center text-red-500">Failed to load hero</div>;
  if (slides.length === 0) return null;

  const item = slides[current];

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] bg-black overflow-hidden group">
      <img
        key={current}
        src={item.banner_url || item.poster_url}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover animate-[fadeIn_0.6s_ease-in-out]"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = item.poster_url || 'https://via.placeholder.com/1280x720/1a1a1a/5a5a5a?text=Aha';
        }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-[clamp(24px,5vw,64px)] max-w-[600px] flex flex-col gap-3 z-10 transition-opacity duration-500">

        <div className="flex gap-2 flex-wrap">
          {(item.genre || []).slice(0, 3).map(g => (
            <span key={g} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-semibold text-white uppercase tracking-wider">
              {g}
            </span>
          ))}
        </div>

        <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.1] text-white drop-shadow-xl m-0">
          {item.title}
        </h1>

        <div className="flex gap-4 text-neutral-300 text-sm items-center flex-wrap font-medium">
          <span className="text-yellow-500 font-bold flex items-center gap-1">
            ⭐ {item.rating || 'N/A'}
          </span>
          {item.release_year && <span>{item.release_year}</span>}
          {item.duration && <span>{item.duration}</span>}
          {item.language && <span>{item.language}</span>}
        </div>

        <p className="line-clamp-3 text-neutral-300 text-base leading-relaxed m-0 max-w-lg drop-shadow-md">
          {item.description}
        </p>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white/80'
              }`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
