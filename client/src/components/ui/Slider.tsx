import { useRef } from 'react';

interface SliderProps {
  children: any;
}

function Slider({ children }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const scrollAmount = 300;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full">
      {/* Nút trái */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/20 shadow-lg backdrop-blur-md transition hover:scale-110"
      >
        <svg
          className="h-5 w-5 rotate-180"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6 4l10 6-10 6V4z" />
        </svg>
      </button>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6"
      >
        {children}
      </div>

      {/* Nút phải */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/20 shadow-lg backdrop-blur-md transition hover:scale-110"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 4l10 6-10 6V4z" />
        </svg>
      </button>
    </div>
  );
}

export default Slider;
