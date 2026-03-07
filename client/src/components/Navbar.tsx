import { useTranslation } from '../context/LanguageContext';
import { useEffect, useState } from 'react';
import LanguageDropdown from './ui/LanguageDropdown';

function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 shadow-lg backdrop-blur-xl'
          : 'bg-gradient-to-br from-[#0f172a] via-[#0c1e3a] to-[#1e293b]'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <a href="/" className="text-xl font-bold text-aqua">
          🐠 Newbie Reefer
        </a>

        {/* MENU */}
        <nav className="hidden items-center gap-8 text-sand lg:flex">
          {/* CORALS MEGA MENU */}
          <div className="group relative">
            <button className="hover:text-aqua">{t('nav.coral')}</button>

            <div className="pointer-events-none absolute left-1/2 top-full w-[700px] -translate-x-1/2 scale-95 rounded-2xl border border-slate-700 bg-deep p-8 opacity-0 shadow-2xl blur-sm transition-all duration-200 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0">
              <div className="grid grid-cols-3 gap-8">
                {/* COLUMN 1 */}
                <div>
                  <p className="mb-3 font-semibold text-aqua">SPS Coral</p>

                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/corals/acropora" className="hover:text-aqua">
                        Acropora
                      </a>
                    </li>

                    <li>
                      <a href="/corals/montipora" className="hover:text-aqua">
                        Montipora
                      </a>
                    </li>

                    <li>
                      <a href="/corals/millepora" className="hover:text-aqua">
                        Millepora
                      </a>
                    </li>
                    <li>
                      <a href="/corals/tenius" className="hover:text-aqua">
                        Acropora tenuis
                      </a>
                    </li>
                  </ul>
                </div>

                {/* COLUMN 2 */}
                <div>
                  <p className="mb-3 font-semibold text-aqua">LPS Coral</p>

                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/corals/torch" className="hover:text-aqua">
                        Torch Coral
                      </a>
                    </li>

                    <li>
                      <a href="/corals/hammer" className="hover:text-aqua">
                        Hammer Coral
                      </a>
                    </li>

                    <li>
                      <a href="/corals/frogspawn" className="hover:text-aqua">
                        Frogspawn
                      </a>
                    </li>
                  </ul>
                </div>

                {/* COLUMN 3 */}
                <div>
                  <p className="mb-3 font-semibold text-aqua">Featured Coral</p>

                  <div className="space-y-3">
                    <div className="cursor-pointer rounded-xl bg-slate-800 p-3 hover:bg-ocean">
                      🔥 Rainbow Torch
                    </div>

                    <div className="cursor-pointer rounded-xl bg-slate-800 p-3 hover:bg-ocean">
                      🌈 Ultra Zoanthid
                    </div>

                    <div className="cursor-pointer rounded-xl bg-slate-800 p-3 hover:bg-ocean">
                      🪸 Master Acro
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FISH */}
          <a href="#" className="hover:text-aqua">
            {t('nav.fish')}
          </a>

          {/* KNOWLEDGE */}
          <a href="#" className="hover:text-aqua">
            {t('nav.knowledge')}
          </a>

          {/* CALCULATOR */}
          <a href="/calculator" className="hover:text-aqua">
            {t('nav.calculator')}
          </a>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-5 text-sand lg:flex">
          <button className="hover:text-aqua">🔍</button>

          <a href="/rewards" className="hover:text-aqua">
            🎁 Rewards
          </a>

          <a href="/login" className="hover:text-aqua">
            Login
          </a>

          <LanguageDropdown />
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="text-2xl text-sand lg:hidden"
        >
          ☰
        </button>

        {mobileOpen && (
          <div
            className={`fixed inset-0 z-50 flex transition-opacity duration-500 ease-out ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'} `}
          >
            {/* overlay */}
            <div
              className="flex-1 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />

            {/* sidebar */}
            <div
              className={`w-[320px] max-w-[80%] transform bg-deep p-6 shadow-2xl transition-transform duration-500 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} `}
            >
              <button
                className="mb-6 text-xl text-sand"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>

              <nav className="space-y-5 text-sand">
                <a href="/corals" className="block hover:text-aqua">
                  {t('nav.coral')}
                </a>

                <a href="/fish" className="block hover:text-aqua">
                  {t('nav.fish')}
                </a>

                <a href="/knowledge" className="block hover:text-aqua">
                  {t('nav.knowledge')}
                </a>

                <a href="/calculator" className="block hover:text-aqua">
                  {t('nav.calculator')}
                </a>

                <hr className="border-slate-700" />

                <a href="/rewards" className="block hover:text-aqua">
                  🎁 Rewards
                </a>

                <a href="/login" className="block hover:text-aqua">
                  Login
                </a>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
