import { useTranslation } from '../context/LanguageContext';
import { useEffect, useState } from 'react';
import LanguageDropdown from './ui/LanguageDropdown';

function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 shadow-lg backdrop-blur-md'
          : 'bg-gradient-to-br from-[#0f172a] via-[#0c1e3a] to-[#1e293b]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-cyan-400">
          🐠 Newbie Reefer
        </a>

        <nav className="hidden gap-6 text-sand md:flex">
          <a href="#" className="transition hover:text-cyan-400">
            {t('nav.coral')}
          </a>
          <a href="#" className="transition hover:text-cyan-400">
            {t('nav.fish')}
          </a>
          <a href="#" className="transition hover:text-cyan-400">
            {t('nav.knowledge')}
          </a>
          <a href="/calculator" className="transition hover:text-cyan-400">
            {t('nav.calculator')}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* LOGIN */}
          <a href="/login" className="text-sand hover:text-aqua">
            Đăng nhập
          </a>

          {/* LANGUAGE */}
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
