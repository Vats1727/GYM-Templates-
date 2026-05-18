import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchData(endpoint, defaultData = null) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '/gym_dev/gym_dev/server/public';
        const res = await axios.get(`${baseUrl}/${endpoint}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch", endpoint, err);
      } finally {
        setLoading(false);
      }
    };
    fetch();

    const handleMsg = (event) => {
      if (event.data && event.data.type === 'LIVE_DATA_REFRESH') {
        fetch();
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [endpoint]);

  return { data, loading };
}
