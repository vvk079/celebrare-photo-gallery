import React from 'react';
import { Heart } from 'lucide-react';

export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image with consistent card dimensions and object-cover styling */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Heart button on every photo card */}
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white active:scale-95 transition-all focus:outline-none"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-neutral-500 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Author name clearly displayed beneath image */}
      <div className="p-4">
        <p className="text-sm font-medium text-neutral-800 truncate" title={photo.author}>
          {photo.author}
        </p>
      </div>
    </div>
  );
}
