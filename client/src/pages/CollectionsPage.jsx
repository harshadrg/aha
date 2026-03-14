import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import useFetch from '../hooks/useFetch';
import BannerCard from '../components/ui/BannerCard';
import Button from '../components/ui/Button';

const CollectionsPage = () => {
  const { id } = useParams(); // 'id' here is the sectionKey (e.g., 'trending', 'movies', 'shows')

  // Map the section key to a meaningful title and API endpoint
  const getCollectionInfo = (key) => {
    switch (key) {
      case 'trending':
        return { title: 'Trending Now', endpoint: '/api/contents?sort=popularity' };
      case 'movies':
        return { title: 'Latest Movies', endpoint: '/api/contents?type=movie&sort=release_date' };
      case 'shows':
        return { title: 'Binge-Worthy Shows', endpoint: '/api/contents?type=show&sort=rating' };
      default:
        return { title: 'Collection', endpoint: '/api/contents' };
    }
  };

  const { title, endpoint } = getCollectionInfo(id);
  const { data: fetchResponse, loading, error } = useFetch(endpoint);

  // Safely extract data
  const data = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6 mb-8 mt-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {title}
          </h1>
          <p className="text-neutral-400 mt-2 text-sm md:text-base">
            Explore all titles in this collection.
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" className="rounded-full border-neutral-700 text-neutral-300 hover:text-white">
            ← Back Home
          </Button>
        </Link>
      </div>

      {/* States */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-neutral-800 aspect-video rounded-lg w-full"></div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-red-500 font-semibold mb-2">Failed to load collection</h3>
          <p className="text-neutral-400">Please try refreshing the page.</p>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-neutral-300 font-semibold">No content available</h3>
        </div>
      )}

      {/* Grid of BannerCards */}
      {!loading && !error && data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {data.map((item) => (
            <BannerCard
              key={item._id}
              id={item._id}
              bannerUrl={item.banner_url || item.poster_url}
              title={item.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionsPage;
