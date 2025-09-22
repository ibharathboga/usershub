import { useState, useCallback } from "react";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (fn, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fn();
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
}
