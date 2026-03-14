import React from 'react';
import useFetch from '../../hooks/useFetch';
import BannerCard from '../ui/BannerCard';

const PromoBannerRow = ({ endpoint }) => {
  const { data: fetchResponse, loading, error } = useFetch(endpoint);
  
  // Safely extract the data array
  const data = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  if (loading || error || data.length === 0) return null;

  // We only want 2 items for this row
  const promoItems = data.slice(0, 2);

  return (
    <div className="w-full max-w-2xl mt-8 mb-12 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
        {promoItems.map((item) => (
          <div key={item._id} className="w-full sm:w-1/2">
            <BannerCard 
              id={item._id}
              bannerUrl={item.banner_url || item.poster_url}
              title={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoBannerRow;
