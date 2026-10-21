import React from 'react';
import PhotoCard from './PhotoCard';
import { AlertCircle, RefreshCw, ImageOff } from 'lucide-react';

export default function PhotoGrid({
  photos,
  loading,
  error,
  onRetry,
  isFavorite,
  onToggleFavorite,
  searchQuery,
  onClearSearch,
}) {
  // 1. Loading State: Render Skeleton Cards
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-neutral-500 animate-pulse">
            Fetching 30 curated photos...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm animate-pulse"
            >
              <div className="aspect-[4/3] bg-neutral-200" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-16 bg-neutral-200 rounded" />
                <div className="h-4 w-32 bg-neutral-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. Error State: Show message and retry button
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center">
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-red-900 mb-1">
            Failed to Load Gallery
          </h2>
          <p className="text-sm text-red-700 mb-6">
            {error}
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 active:scale-95 transition-all shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Fetching</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. Empty Search State: When query produces 0 matches
  if (photos.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 text-center">
        <div className="p-8 bg-white border border-neutral-200 rounded-2xl shadow-sm">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
            <ImageOff className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-800 mb-1">
            No matching photos found
          </h2>
          <p className="text-sm text-neutral-500 mb-5">
            We couldn't find any photos by author matching{' '}
            <span className="font-semibold text-neutral-800">"{searchQuery}"</span>.
          </p>
          {onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
    );
  }

  // 4. Photos Grid: Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols
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
