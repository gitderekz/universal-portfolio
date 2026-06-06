import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseApiOptions {
  fallbackData?: any;
  immediate?: boolean;
}

export function useApi<T = any>(
  apiCall: () => Promise<any>,
  fallbackData: T,
  immediate = true
) {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<Error | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      setData(response.data.data || response.data);
      setUsedFallback(false);
    } catch (err) {
      console.warn('API call failed, using fallback data:', err);
      setError(err as Error);
      setData(fallbackData);
      setUsedFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  return { data, loading, error, usedFallback, refetch: fetchData };
}
