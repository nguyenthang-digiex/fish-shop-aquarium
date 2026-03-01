import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';

export default function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = language === 'vi' ? 'Tiếng Việt' : 'English';

  return (
    <>
      {' '}
      <div className="relative z-40" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg bg-cyan-500 px-3 py-1 text-sm font-semibold"
        >
          {language.toUpperCase()}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-24 rounded-lg bg-white text-black shadow-lg">
            <button
              onClick={() => {
                setLanguage('vi');
                setOpen(false);
              }}
              className="block w-full px-3 py-2 hover:bg-gray-100"
            >
              🇻🇳 VI
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                setOpen(false);
              }}
              className="block w-full px-3 py-2 hover:bg-gray-100"
            >
              🇺🇸 EN
            </button>
          </div>
        )}
      </div>
    </>
  );
}
