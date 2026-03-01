import { useEffect, useState } from 'react';
import { Brand, ElementType } from '../../lib/reefConfig';
import { calculateDose, calculateMix } from '../../lib/reefEngine';
import Input from './Input';
import { useTranslation } from '../../context/LanguageContext';

const elementDefaults = {
  kh: { current: 7, target: 8, unit: 'dKH' },
  ca: { current: 400, target: 420, unit: 'ppm' },
  mg: { current: 1200, target: 1300, unit: 'ppm' },
};

export default function MajorCalculator() {
  const { t } = useTranslation();
  const [brand, setBrand] = useState<Brand>('fauna');
  const [element, setElement] = useState<ElementType>('kh');

  // SECTION 1: Tank info
  const [tank, setTank] = useState(100);
  const [current, setCurrent] = useState(7);
  const [target, setTarget] = useState(8);

  // SECTION 2: Mix info
  const [powder, setPowder] = useState(0);

  const delta = target - current;

  const dose = calculateDose(brand, element, tank, current, target);
  const mix = calculateMix(brand, element, powder);

  useEffect(() => {
    setCurrent(elementDefaults[element].current);
    setTarget(elementDefaults[element].target);
  }, [element]);

  return (
    <div className="space-y-10">
      {/* SECTION 1 — TANK INFO */}
      <div className="space-y-6 rounded-xl bg-slate-800 p-6">
        <h2 className="text-2xl font-semibold">{t('calculator.tankInfo')}</h2>

        {/* Brand */}
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value as Brand)}
          className="w-full rounded-lg bg-slate-900 p-2"
        >
          <option value="fauna">Fauna Marin</option>
          <option value="aquaForest">Aquaforest</option>
          <option value="coralEssential">Coral Essentials</option>
        </select>

        {/* Element */}
        <div className="flex gap-3">
          {['kh', 'ca', 'mg'].map((e) => (
            <button
              key={e}
              onClick={() => setElement(e as ElementType)}
              className={`rounded-full px-4 py-2 ${
                element === e ? 'bg-cyan-500' : 'bg-slate-900'
              }`}
            >
              {e.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Input
            label={t('calculator.tankVolume')}
            value={tank}
            onChange={setTank}
          />
          <Input
            label={`${t('calculator.current')} (${elementDefaults[element].unit})`}
            value={current}
            onChange={setCurrent}
          />
          <Input
            label={`${t('calculator.target')} (${elementDefaults[element].unit})`}
            value={target}
            onChange={setTarget}
          />
        </div>

        {delta > 0 && (
          <>
            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-slate-400">{t('calculator.increaseNeeded')}</p>
              <p className="text-xl font-bold text-cyan-400">
                {delta.toFixed(2)} {element === 'kh' ? 'dKH' : 'ppm'}
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-slate-400">{t('calculator.doseNeeded')}:</p>
              <p className="text-xl font-bold text-cyan-400">
                {dose.toFixed(2)} ml
              </p>
            </div>
          </>
        )}
      </div>

      {/* SECTION 2 — RESULT + MIX */}
      {delta > 0 && (
        <div className="space-y-6 rounded-xl bg-slate-800 p-6">
          <h2 className="text-2xl font-semibold">
            {t('calculator.mixFormula')}
          </h2>

          <div className="space-y-4">
            <h3 className="font-semibold">{t('calculator.mixSolution')}</h3>

            <Input
              label={t('calculator.powderAmount')}
              value={powder}
              onChange={setPowder}
            />

            <div className="space-y-2 rounded-lg bg-slate-900 p-4">
              <p>
                → {t('calculator.totalVolume')}: {mix.volumeLiter.toFixed(2)} L
              </p>
              <p>
                → {t('calculator.traceNeeded')}: {mix.traceAmount.toFixed(2)} ml
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
