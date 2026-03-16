import { Link } from 'react-router';
import useFetch from '../hooks/useFetch';
import BannerCard from '../components/ui/BannerCard';
import { ArrowLeft } from '../components/ui/Icons';

const ShowsPage = () => {
  const { data: fetchResponse, loading, error } = useFetch('/api/collections');
  const data = Array.isArray(fetchResponse) ? fetchResponse : fetchResponse?.data || [];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 pb-24">

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-neutral-800 pb-6 mb-8 mt-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-neutral-400 hover:text-white transition-colors duration-200 flex-shrink-0">
            <ArrowLeft size={22} strokeWidth={4.5} />
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">All Shows</h1>
        </div>
        <p className="text-neutral-400 text-sm md:text-base">Discover every TV show available on Aha.</p>
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
          <h3 className="text-xl text-red-500 font-semibold mb-2">Failed to load shows</h3>
          <p className="text-neutral-400">Please try refreshing the page.</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && data.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl text-neutral-300 font-semibold">No shows available</h3>
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

export default ShowsPage;
