import React from 'react';
import useFetch from '../hooks/useFetch';
import PosterCard from '../components/ui/PosterCard';

const MoviesPage = () => {
  const { data: fetchResponse, loading, error } = useFetch('/api/collections?type=movie');
  const movies = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pb-24">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">Movies</h1>
        <p className="text-neutral-400 text-sm md:text-base">Browse our complete collection of newly released and classic movies.</p>
      </div>

      {loading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse bg-neutral-800 aspect-[2/3] rounded-md w-full"></div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-red-500 font-semibold mb-2">Failed to load movies</h3>
          <p className="text-neutral-400">Please try refreshing the page.</p>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-neutral-300 font-semibold">No movies available</h3>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {movies.map((item) => (
            <PosterCard
              key={item._id}
              id={item._id}
              posterUrl={item.poster_url || item.banner_url}
              title={item.title}
              releaseYear={item.release_year}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
