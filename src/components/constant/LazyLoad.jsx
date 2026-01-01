import { useEffect, useState } from "react";

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
