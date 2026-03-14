import React from 'react';
import HeroBanner from '../components/homelayout/HeroBanner';
import ContentRow from '../components/homelayout/ContentRow';
import PromoBannerRow from '../components/homelayout/PromoBannerRow';

const HomePage = () => {
  return (
    <div className="pb-12 text-white bg-black min-h-screen">
      <HeroBanner />
      <div className="p-8 mx-auto space-y-8 mt-4">
        <ContentRow title="Trending" endpoint="/api/contents?sort=popularity" sectionKey="trending" cardSize="sm" />
        
        {/* Injected 2 Banners Here */}
        <PromoBannerRow endpoint="/api/contents?type=original&sort=popularity" />

        <ContentRow
          title="Latest Movies"
          endpoint="/api/contents?type=movie&sort=release_date"
          sectionKey="movies"
        />
        <ContentRow
          title="Binge-Worthy Shows"
          endpoint="/api/contents?type=show&sort=rating"
          sectionKey="shows"
        />
      </div>
    </div>
  );
};

export default HomePage;
