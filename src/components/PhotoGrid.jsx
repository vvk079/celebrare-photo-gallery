import React from 'react';
import PhotoCard from './PhotoCard';

export default function PhotoGrid({
  photos,
  loading,
  error,
  onRetry,
  isFavorite,
  onToggleFavorite,
  searchQuery,
}) {
  // Loading state: Spinner and Skeleton grid
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center mb-8 space-y-3">
          <div
            className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"
            role="status"
            aria-label="Loading photos"
          />
          <p className="text-sm font-medium text-neutral-500">Loading photos...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm animate-pulse"
            >
              <div className="aspect-[4/3] bg-neutral-200" />
              <div className="p-4">
                <div className="h-4 bg-neutral-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state: Message with retry button
  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 px-4 text-center">
        <div className="p-6 bg-white border border-red-200 rounded-xl shadow-sm">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // Empty state: No author matches search
  if (photos.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 px-4 text-center">
        <div className="p-6 bg-white border border-neutral-200 rounded-xl shadow-sm">
          <p className="text-neutral-600 text-sm">
            No photos found matching "{searchQuery}".
          </p>
        </div>
      </div>
    );
  }

  // Responsive Grid: Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isFavorite={isFavorite(photo.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
