import { useState, useEffect } from 'react';

/**
 * A hook that retrieves data from a local fallback object.
 * When the server is created, this hook can be swapped to pull from VITE_API_URL/endpoints.
 */
export default function useFetchData(endpoint, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // For future implementation:
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       setLoading(true);
  //       const baseUrl = import.meta.env.VITE_API_URL || '/server';
  //       const res = await fetch(`${baseUrl}/${endpoint}`);
  //       const json = await res.json();
  //       setData(json);
  //     } catch (err) {
  //       setError(err);
  //       console.error("Fetch failed: ", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetch();
  // }, [endpoint]);

  return { data, loading, error };
}
