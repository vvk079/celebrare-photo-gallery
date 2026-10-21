import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PhotoGrid from './components/PhotoGrid';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { useFavorites } from './hooks/useFavorites';

/**
 * Main Photo Gallery Application Component
 */
export default function App() {
  // Fetch photos using custom hook
  const { photos, loading, error, retry } = useFetchPhotos();

  // Manage favorites with useReducer via custom hook
  const { isFavorite, toggleFavorite } = useFavorites();

  // Controlled search state
  const [searchQuery, setSearchQuery] = useState('');

  // useCallback on search input handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // useMemo to filter fetched photos by author name in real time
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) {
      return photos;
    }
    const query = searchQuery.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-800">
      <Header />

      <main className="flex-1 pb-12">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <PhotoGrid
          photos={filteredPhotos}
          loading={loading}
          error={error}
          onRetry={retry}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
        />
      </main>

      <footer className="border-t border-neutral-200 bg-white py-4 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Photo Gallery</p>
      </footer>
    </div>
  );
}

export { App as Gallery };
