import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(photo.id);
  };

  return (
    <article className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-200/70 animate-pulse" />
        )}

        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Favorite Heart Button Overlay */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? `Remove photo by ${photo.author} from favorites` : `Add photo by ${photo.author} to favorites`}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white active:scale-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite
                ? 'fill-red-500 text-red-500 scale-110'
                : 'text-neutral-500 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Card Body: Author & Details */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            Author
          </p>
          <h2 className="text-sm sm:text-base font-semibold text-neutral-800 truncate" title={photo.author}>
            {photo.author}
          </h2>
        </div>

        <span className="text-[11px] text-neutral-400 font-mono flex-shrink-0 bg-neutral-50 px-2 py-1 rounded border border-neutral-100">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}
