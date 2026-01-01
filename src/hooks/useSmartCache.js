import { useState, useEffect } from "react";

const useSmartCache = (key, fetcher, ttl = 300000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(key);
    const cachedTime = sessionStorage.getItem(`${key}_time`);

    if (cached && cachedTime && Date.now() - cachedTime < ttl) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const load = async () => {
      const result = await fetcher();
      setData(result);
      setLoading(false);
      sessionStorage.setItem(key, JSON.stringify(result));
      sessionStorage.setItem(`${key}_time`, Date.now());
    };

    load();
  }, [key]);

  return { data, loading };
};

export default useSmartCache;
