import { useEffect, useState, Suspense } from "react";
import PageLoader from "./PageLoder";

const LazyLoad = ({ component: Component }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
};

export default LazyLoad;
