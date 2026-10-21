import { useState, useEffect, useCallback } from 'react';

// Using page=2&limit=30 from Picsum API to fetch 30 photos with diverse authors and unique images
const API_URL = 'https://picsum.photos/v2/list?page=2&limit=30';

/**
 * Custom hook to fetch 30 photos from Picsum Photos API.
 * Returns photos, loading, and error states, with cleanup and retry support.
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

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
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Failed to load photos. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();

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
