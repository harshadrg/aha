import React from 'react';
import { useParams, Link } from 'react-router';
import useFetch from '../hooks/useFetch';
import Button from '../components/ui/Button';

const DetailsPage = () => {
  const { id } = useParams();
  const { data: fetchResponse, loading, error } = useFetch(`/api/contents/${id}`);
  
  // Clean up response if it wraps the entity in a data object
  const item = fetchResponse?.data || fetchResponse;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-8 w-64 bg-neutral-800 rounded"></div>
          <div className="h-4 w-48 bg-neutral-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4 p-8">
        <h2 className="text-2xl font-bold text-red-500">Content Not Found</h2>
        <p className="text-neutral-400">The requested show or movie could not be found.</p>
        <Link to="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Banner Area */}
      <div className="relative w-full h-[50vh] md:h-[70vh] min-h-[400px]">
        <img
          src={item.banner_url || item.poster_url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = item.poster_url || 'https://via.placeholder.com/1280x720/1a1a1a/5a5a5a?text=Aha';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Detail Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl z-10 flex flex-col md:flex-row gap-8 items-end md:items-start">
          
          {/* Poster inset (visible on md+) */}
          <div className="hidden md:block w-48 shrink-0 rounded-lg overflow-hidden shadow-2xl border border-white/10">
            <img 
              src={item.poster_url} 
              alt={`${item.title} Poster`}
              className="w-full h-auto object-cover aspect-[2/3]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/5a5a5a?text=Aha';
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-xs font-bold uppercase tracking-wider text-primary border border-primary/30">
                {item.type}
              </span>
              {(item.genre || []).map(g => (
                <span key={g} className="px-2 py-1 bg-neutral-800/80 rounded text-xs font-medium text-neutral-300">
                  {g}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {item.title}
            </h1>

            <div className="flex gap-4 text-sm font-medium text-neutral-300 flex-wrap items-center">
              <span className="text-yellow-500 font-bold flex items-center gap-1">
                ⭐ {item.rating || 'N/A'}
              </span>
              {item.release_year && <span>{item.release_year}</span>}
              {item.duration && <span>{item.duration}</span>}
              {item.language && <span className="uppercase">{item.language}</span>}
            </div>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl mt-2 drop-shadow-md">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Button size="lg" className="rounded-full px-8 bg-gradient-to-t from-[oklch(55%_0.22_44.5)] to-[oklch(67.5%_0.22_44.5)] text-white hover:opacity-90 border-0 shadow-lg font-bold">
                ▶ Watch Trailer
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6 backdrop-blur-sm bg-black/30 border-white/20 hover:bg-white/10">
                + Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <h3 className="text-xl font-bold mb-6 text-primary border-b border-neutral-800 pb-2">More Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {item.cast && item.cast.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Cast</h4>
              <p className="text-neutral-200">{item.cast.join(', ')}</p>
            </div>
          )}
          {item.director && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wide">Director</h4>
              <p className="text-neutral-200">{item.director}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
