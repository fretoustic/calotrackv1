import { useState, useCallback } from 'react';
import axios from 'axios';

interface UseSearchApiProps {
  baseUrl?: string;
  searchTerm: string;
}

export const useSearchApi = ({ 
  baseUrl = 'https://api.calorieninjas.com/v1/nutrition',
  searchTerm
}: UseSearchApiProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data: response } = await axios.get(baseUrl, {
        params: {
          query: searchTerm,
        },
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': 'kedOfuHi3lli9mRR5TDAGQ==Y9w0JkMScWt5iAcy',
        },
      });

      setData(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, searchTerm]);

  return {
    searchTerm,
    handleSearch,
    isLoading,
    error,
    data,
  };
}; 