import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch 30 photos from Picsum Photos API.
 * Handles loading, error, cleanup with AbortController, and refetching.
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null, retry: Function }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  // Function allowing UI to retry fetching when an error occurs
  const retry = useCallback(() => {
    setLoading(true);
    setError(null);
    setRetryTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, { signal });

        if (!response.ok) {
          throw new Error(`Failed to fetch photos (HTTP ${response.status}: ${response.statusText || 'Error'})`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Ignore AbortError when unmounted
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Failed to load photos. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();

    // Cleanup function: abort fetch on unmount or retry
    return () => {
      controller.abort();
    };
  }, [retryTrigger]);

  return {
    photos,
    loading,
    error,
    retry,
  };
}
