import { useEffect, useState } from "react";

export default function useJsonFetch(url) {
  const [data, setData] = useState<object>();
  const [error, setError] = useState<object>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(data);
        setError(undefined);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return [{ data, error, loading }];
}
