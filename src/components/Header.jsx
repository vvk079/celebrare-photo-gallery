import React from 'react';
import { Camera, Heart } from 'lucide-react';

export default function Header({ totalPhotos = 0, favoritesCount = 0 }) {
  return (
    <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-neutral-900 text-white rounded-xl shadow-sm">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
                Photo Gallery
              </h1>
              <p className="text-sm text-neutral-500 mt-0.5">
                Discover beautiful moments.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
              <span>{totalPhotos} Photos</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>{favoritesCount} {favoritesCount === 1 ? 'Favourite' : 'Favourites'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
