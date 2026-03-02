import { useTranslation } from '../context/LanguageContext';
import Button from '../components/ui/Button';

function Hero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-[#0f172a] via-[#0c1e3a] to-[#1e293b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <h1 className="mb-6 text-5xl font-bold leading-tight">
          {t('hero.title')}
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-300">
          {t('hero.description')}
        </p>

        <div className="flex gap-4">
          <Button>{t('hero.explore')}</Button>

          <Button variant="outline">
            <a href="/calculator">{t('hero.reefCalc')}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
