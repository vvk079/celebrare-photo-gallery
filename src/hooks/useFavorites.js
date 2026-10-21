import { useReducer, useEffect, useCallback } from 'react';
import { favoritesReducer, FAVORITES_ACTIONS } from '../reducers/favoritesReducer';

const STORAGE_KEY = 'celebrare_favorite_photos';

/**
 * Lazy initializer function to retrieve stored favorites from localStorage on initial load.
 */
function getInitialFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
}

/**
 * Custom hook to manage favorites state using useReducer and synchronize with localStorage.
 */
export function useFavorites() {
  const [favorites, dispatch] = useReducer(favoritesReducer, [], getInitialFavorites);

  // Persist favorites to localStorage whenever the state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  // Action dispatcher helper: toggle favorite
  const toggleFavorite = useCallback((id) => {
    dispatch({ type: FAVORITES_ACTIONS.TOGGLE_FAVORITE, payload: id });
  }, []);

  // Check if a specific photo is marked as favorite
  const isFavorite = useCallback(
    (id) => favorites.includes(id),
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
    dispatch,
  };
}
