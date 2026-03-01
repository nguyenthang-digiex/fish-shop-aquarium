import { useLanguage, useTranslation } from '../context/LanguageContext';
import { useState } from 'react';
import LanguageDropdown from './ui/LanguageDropdown';

function Navbar() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0f172a] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-cyan-400">🐠 Newbie Reefer</div>

        <nav className="hidden gap-6 md:flex">
          <a href="#">{t('nav.coral')}</a>
          <a href="#">{t('nav.fish')}</a>
          <a href="#">{t('nav.knowledge')}</a>
          <a href="#">{t('nav.calculator')}</a>
        </nav>

        <LanguageDropdown />
      </div>
    </header>
  );
}

export default Navbar;
