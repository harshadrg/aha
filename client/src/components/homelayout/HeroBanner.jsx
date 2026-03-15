import { useState, useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import { ChevronLeft, ChevronRight } from '../ui/Icons';

const HeroBanner = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const autoPlayRef = useRef(null);

  const { data: fetchResponse, loading, error } = useFetch('/api/contents?sort=popularity');
  const responseData = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  useEffect(() => {
    if (responseData.length > 0) setSlides(responseData.slice(0, 8));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    autoPlayRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(autoPlayRef.current);
  }, [slides.length]);

  const goTo = (i) => {
    clearInterval(autoPlayRef.current);
    setCurrent(i);
  };

  const thumbSlots = [-1, 0, 1].map((offset) => {
    const idx = current + offset;
    return idx >= 0 && idx < slides.length ? { slide: slides[idx], idx } : null;
  });

  if (loading) return (
    <div className="w-full h-[40vw] min-h-[260px] md:h-[60vh] lg:h-[78vh] bg-neutral-900 animate-pulse flex items-center justify-center text-white text-sm">
      Loading...
    </div>
  );
  if (error) return (
    <div className="w-full h-[40vw] min-h-[260px] md:h-[60vh] lg:h-[78vh] bg-neutral-900 flex items-center justify-center text-red-500">
      Failed to load hero
    </div>
  );
  if (!slides.length) return null;

  const item = slides[current];

  return (
    // Mobile: 16:9-ish ratio via vw | Tablet: 60vh | Laptop+: 78vh
    <div className="relative w-full h-[56vw] min-h-[260px] md:h-[60vh] lg:h-[78vh] bg-black">

      {/* Background */}
      <img
        key={current}
        src={item.banner_url || item.poster_url}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-contain md:object-cover object-top animate-[fadeIn_0.7s_ease-in-out]"
        onError={(e) => { e.target.onerror = null; e.target.src = item.poster_url || ''; }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Left Panel */}
      <div className="absolute bottom-3 sm:bottom-6 lg:bottom-8 left-0 flex flex-col px-4 sm:px-8 md:px-14 z-10 gap-2 sm:gap-3 lg:gap-4 max-w-[70%] sm:max-w-[55%] lg:max-w-[42%]">

        {/* Badges — hidden on smallest screens */}
        <div className="hidden sm:flex gap-2 flex-wrap">
          {item.is_original && (
            <span className="px-2 py-0.5 bg-red-600 rounded text-[10px] font-bold text-white uppercase tracking-widest">
              Original
            </span>
          )}
          {(item.genre || []).slice(0, 3).map((g) => (
            <span key={g} className="px-2 py-0.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded text-[10px] font-semibold text-white uppercase tracking-wider">
              {g}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-[clamp(14px,4vw,50px)] font-black leading-[1.1] text-white drop-shadow-2xl m-0">
          {item.title}
        </h1>

        {/* Meta */}
        <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm items-center flex-wrap font-medium">
          {item.rating && (
            <span className="text-yellow-400 font-bold">⭐ {item.rating}</span>
          )}
          {item.release_year && (
            <span className="text-neutral-400">{item.release_year}</span>
          )}
          {item.duration && (
            <span className="hidden sm:inline text-neutral-400">{item.duration}</span>
          )}
          {item.language && (
            <span className="px-1.5 py-0.5 border border-neutral-600 rounded text-[10px] sm:text-[11px] text-neutral-300 uppercase">
              {item.language}
            </span>
          )}
        </div>

        {/* Description — only md+ */}
        <p className="hidden md:block line-clamp-2 text-neutral-300 text-sm leading-relaxed m-0 max-w-sm">
          {item.description}
        </p>

        {/* Thumbnail Strip — hidden on mobile, shown sm+ */}
        <div className="hidden sm:flex items-center gap-2 mt-1">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="flex-shrink-0 p-1 rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-25 disabled:cursor-not-allowed text-white transition-all duration-200"
          >
            <ChevronLeft size={14} />
          </button>

          {thumbSlots.map((entry, slotIdx) =>
            !entry ? (
              <div key={`empty-${slotIdx}`} className="flex-shrink-0 w-16 h-10 md:w-24 md:h-14 rounded-md bg-white/5" />
            ) : (
              <button
                key={entry.idx}
                onClick={() => goTo(entry.idx)}
                className={`relative flex-shrink-0 w-16 h-10 md:w-24 md:h-14 rounded-md overflow-hidden border-2 transition-all duration-300 ${slotIdx === 1
                  ? 'border-red-500 scale-105 shadow-md shadow-red-900/50 opacity-100'
                  : 'border-white/20 hover:border-white/60 opacity-55 hover:opacity-100'
                  }`}
              >
                <img
                  src={entry.slide.poster_url || entry.slide.banner_url}
                  alt={entry.slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = ''; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1">
                  <span className="text-[7px] md:text-[8px] text-white font-semibold line-clamp-1">{entry.slide.title}</span>
                </div>
                {slotIdx === 1 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />}
              </button>
            )
          )}

          <button
            onClick={() => goTo(current + 1)}
            disabled={current === slides.length - 1}
            className="flex-shrink-0 p-1 rounded-full bg-white/10 hover:bg-white/25 disabled:opacity-25 disabled:cursor-not-allowed text-white transition-all duration-200"
          >
            <ChevronRight size={14} />
          </button>

          <span className="text-[10px] text-neutral-400 ml-0.5 flex-shrink-0">
            {current + 1}/{slides.length}
          </span>
        </div>
      </div>

      {/* Mobile dots — replaces thumbnail strip on xs */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 sm:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'bg-red-500 w-4' : 'bg-white/40 w-1'}`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroBanner;