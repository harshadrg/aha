import { useParams, Link } from 'react-router';
import useFetch from '../hooks/useFetch';
import BannerCard from '../components/ui/BannerCard';
import { ArrowLeft } from '../components/ui/Icons';

const getCollectionInfo = (key) => {
  switch (key) {
    case 'trending': return { title: 'Trending Now', endpoint: '/api/contents?sort=popularity' };
    case 'movies': return { title: 'Latest Movies', endpoint: '/api/contents?type=movie&sort=release_date' };
    case 'shows': return { title: 'Binge-Worthy Shows', endpoint: '/api/contents?type=show&sort=rating' };
    default: return { title: 'Collection', endpoint: '/api/contents' };
  }
};

const CollectionsPage = () => {
  const { id } = useParams();
  const { title, endpoint } = getCollectionInfo(id);
  const { data: fetchResponse, loading, error } = useFetch(endpoint);
  const data = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pb-24">

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-neutral-800 pb-6 mb-8 mt-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-neutral-400  hover:text-white transition-colors duration-200 flex-shrink-0">
            <ArrowLeft size={22} strokeWidth={4.5} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">{title}</h1>
        </div>
        <p className="text-neutral-400 text-sm md:text-base">Explore all titles in this collection.</p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse bg-neutral-800 aspect-video rounded-lg w-full" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-red-500 font-semibold mb-2">Failed to load collection</h3>
          <p className="text-neutral-400">Please try refreshing the page.</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && data.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-neutral-300 font-semibold">No content available</h3>
        </div>
      )}

      {/* Grid */}
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