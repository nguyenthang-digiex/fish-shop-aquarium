import Hero from '../components/Hero';
import Slider from '../components/ui/Slider';
import ProductCard from '../components/product/ ProductCard';
import { useTranslation } from '../context/LanguageContext';
import { corals, fish } from '../data/product';

function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <div className="bg-slate-950 px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold text-white">
          {t('hero.prominentCoral')}
        </h2>
        <Slider>
          {corals.map((item?: any) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              badge={item.badge}
            />
          ))}
        </Slider>
        <div className="my-2 py-2" />
        <h2 className="mb-8 text-3xl font-bold text-white">
          {t('hero.prominentFish')}
        </h2>
        <Slider>
          {fish.map((item?: any) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Home;
