import { App } from './App';

export default function CircularGallery({ items, bend, textColor }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const app = new App(containerRef.current, { items, bend, textColor });
    return () => app.destroy();
  }, [items, bend, textColor]);
  return <div ref={containerRef} className="w-full h-[600px] relative" />;
}
