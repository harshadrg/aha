import { useParams, Link } from 'react-router';
import useFetch from '../hooks/useFetch';
import Button from '../components/ui/Button';
import { Share } from '../components/ui/Icons';
import ThumbnailCard from '../components/ui/ThumbnailCard';

const MetaBadge = ({ children, className = '' }) => (
  <span className={`px-2 py-1 rounded text-xs font-medium ${className}`}>{children}</span>
);

const DetailField = ({ label, value }) =>
  value ? (
    <div>
      <h4 className="text-sm font-semibold text-neutral-400 mb-2 uppercase tracking-wide">{label}</h4>
      <p className="text-neutral-200">{value}</p>
    </div>
  ) : null;

const DetailsPage = () => {
  const { id } = useParams();
  const { data: fetchResponse, loading, error } = useFetch(`/api/contents/${id}`);
  const item = fetchResponse?.data || fetchResponse;

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="h-8 w-64 bg-neutral-800 rounded" />
        <div className="h-4 w-48 bg-neutral-800 rounded" />
      </div>
    </div>
  );

  if (error || !item) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4 p-8">
      <h2 className="text-2xl font-bold text-red-500">Content Not Found</h2>
      <p className="text-neutral-400">The requested show or movie could not be found.</p>
      <Link to="/"><Button variant="primary">Return Home</Button></Link>
    </div>
  );

  const fallbackImg = (e, fallback) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">

      {/* Hero */}
      <div className="relative w-full min-h-[560px] md:min-h-[680px] h-[70vh] md:h-[85vh] pt-16">
        <img
          src={item.banner_url || item.poster_url}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-top"
          onError={(e) => fallbackImg(e, item.poster_url || 'https://via.placeholder.com/1280x720/1a1a1a/5a5a5a?text=Aha')}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* absolute bottom-0 pins content to hero bottom — hero is in normal flow so no navbar overlap */}
        <div className="absolute bottom-8 left-0 right-0 pl-10 md:pl-16 pr-6 md:pr-12 py-6 md:py-12 max-w-4xl z-10 flex flex-col gap-6 items-start">

          {/* ThumbnailCard — slightly larger w-80, hidden on mobile */}
          <div className="hidden md:block w-80">
            <ThumbnailCard
              title={item.title}
              thumbnailUrl={item.thumbnail_url}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">

            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <MetaBadge className="bg-white/10 backdrop-blur-md font-bold uppercase tracking-wider text-primary border border-primary/30">
                {item.type}
              </MetaBadge>
              {(item.genre || []).map((g) => (
                <MetaBadge key={g} className="bg-neutral-800/80 text-neutral-300">{g}</MetaBadge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {item.title}
            </h1>

            {/* Meta row */}
            <div className="flex gap-4 text-sm font-medium text-neutral-300 flex-wrap items-center">
              {item.rating && <span className="text-yellow-500 font-bold">⭐ {item.rating}</span>}
              {item.release_year && <span>{item.release_year}</span>}
              {item.duration && <span>{item.duration}</span>}
              {item.language && <span className="uppercase">{item.language}</span>}
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl mt-2 drop-shadow-md">
              {item.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 items-center">
              <Button
                size="lg"
                className="flex items-center gap-2 !rounded-full px-8 bg-gradient-to-t from-[oklch(55%_0.22_44.5)] to-[oklch(67.5%_0.22_44.5)] text-white hover:opacity-90 border-0 shadow-lg font-bold"
              >
                Subscribe Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2 !rounded-full px-6 backdrop-blur-sm bg-black/30 border-white/20 hover:bg-white/10"
              >
                Play Trailer
              </Button>

              <button
                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white transition-colors duration-200"
                aria-label="Share"
              >
                <Share size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-7xl mt-16 mx-auto px-6 md:px-12 py-12">
        <h3 className="text-xl font-bold mb-6 text-primary border-b border-neutral-800 pb-2">More Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DetailField label="Cast" value={item.cast?.join(', ')} />
          <DetailField label="Director" value={item.director} />
        </div>
      </div>

    </div>
  );
};

export default DetailsPage;