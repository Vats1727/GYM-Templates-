import { useState, useEffect } from 'react';

export default function useFetchData(endpoint, defaultData = null) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '/GYM-Templates-/GYM_Server/public';
        const res = await fetch(`${baseUrl}/${endpoint}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch", endpoint, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const handleMsg = (event) => {
      if (event.data && event.data.type === 'LIVE_DATA_REFRESH') {
        fetchData();
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [endpoint]);

  return { data, loading };
}
