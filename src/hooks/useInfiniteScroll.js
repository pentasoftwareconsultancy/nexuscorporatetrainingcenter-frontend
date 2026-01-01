import { useEffect, useRef } from "react";

const useInfiniteScroll = (loadMore, hasMore, loading) => {
  const observer = useRef();

  const lastElementRef = node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observer.current.observe(node);
  };

  return lastElementRef;
};

export default useInfiniteScroll;
