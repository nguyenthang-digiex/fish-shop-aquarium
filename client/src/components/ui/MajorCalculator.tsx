import { useEffect, useState } from 'react';
import { Brand, ElementType, safetyLimits } from '../../lib/reefConfig';
import { calculateReefPlan } from '../../lib/reefEngine';
import Input from './Input';
import { useTranslation } from '../../context/LanguageContext';

const elementDefaults = {
  kh: { current: 7, target: 8, unit: 'dKH' },
  ca: { current: 400, target: 420, unit: 'ppm' },
  mg: { current: 1200, target: 1300, unit: 'ppm' },
};

const reefTargets = {
  mixed: {
    kh: 8,
    ca: 420,
    mg: 1300,
  },
  sps: {
    kh: 7.5,
    ca: 430,
    mg: 1350,
  },
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
  const [dailyConsumption, setDailyConsumption] = useState(0);
  const [reefType, setReefType] = useState<'mixed' | 'sps'>('mixed');

  const plan = calculateReefPlan({
    brand,
    element,
    reefType,
    tankVolume: tank,
    current,
    target,
    dailyConsumption,
    powderGram: powder,
  });

  const isUnsafe = plan?.delta > safetyLimits[element];

  useEffect(() => {
    setCurrent(elementDefaults[element].current);
    setTarget(elementDefaults[element].target);
  }, [element]);

  useEffect(() => {
    setTarget(reefTargets[reefType][element]);
  }, [reefType, element]);

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

        <div className="flex gap-3">
          {['mixed', 'sps'].map((mode) => (
            <button
              key={mode}
              onClick={() => setReefType(mode as any)}
              className={`rounded-full px-4 py-2 transition ${
                reefType === mode
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-900 text-slate-400'
              }`}
            >
              {mode === 'mixed' ? 'Mixed Reef' : 'SPS Dominant'}
            </button>
          ))}
        </div>
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

        {plan?.delta > 0 && (
          <>
            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-slate-400">{t('calculator.increaseNeeded')}</p>
              <p className="text-xl font-bold text-cyan-400">
                {plan?.delta.toFixed(2)} {element === 'kh' ? 'dKH' : 'ppm'}
              </p>
            </div>

            <div className="rounded-lg bg-slate-900 p-4">
              <p className="text-slate-400">{t('calculator.doseNeeded')}:</p>
              <p className="text-xl font-bold text-cyan-400">
                {plan?.totalDose.toFixed(2)} ml
              </p>
            </div>
          </>
        )}

        {isUnsafe && (
          <div className="rounded-lg border border-red-500 bg-red-900/40 p-4">
            <p className="font-semibold text-red-400">
              ⚠️ Không nên tăng quá {safetyLimits[element]}{' '}
              {elementDefaults[element].unit} mỗi ngày.
            </p>
          </div>
        )}

        {plan?.timeline.map((item) => (
          <div key={item.day}>
            Day {item.day}: {item.value.toFixed(2)} dKH
          </div>
        ))}

        <Input
          label="Mức tiêu thụ mỗi ngày"
          value={dailyConsumption}
          onChange={setDailyConsumption}
        />

        {/* ===== RECOVERY MODE ===== */}
        {plan?.delta > 0 && (
          <div className="space-y-2 rounded-lg bg-slate-900 p-4">
            <p className="text-slate-400">Kế hoạch tăng an toàn:</p>

            <p>
              👉 Chia trong <b>{plan.daysNeeded}</b> ngày
            </p>

            <p>
              👉 Mỗi ngày tăng:{' '}
              <b>
                {plan.deltaPerDay.toFixed(2)} {elementDefaults[element].unit}
              </b>
            </p>

            <p>
              👉 Mỗi ngày châm: <b>{plan.dosePerDay.toFixed(2)} ml</b>
            </p>
          </div>
        )}

        {/* ===== MAINTENANCE MODE ===== */}
        {dailyConsumption > 0 && (
          <div className="mt-4 space-y-2 rounded-lg bg-slate-900 p-4">
            <p className="text-slate-400">Liều duy trì mỗi ngày:</p>

            <p>
              👉 <b>{plan?.maintenanceDose.toFixed(2)} ml / ngày</b>
            </p>
          </div>
        )}
      </div>
      {plan?.delta === 0 && dailyConsumption === 0 && (
        <div className="mt-4 rounded-lg bg-slate-900 p-4 text-slate-400">
          Bể đang ổn định — chưa cần điều chỉnh.
        </div>
      )}

      {/* SECTION 2 — RESULT + MIX */}
      {plan?.delta > 0 && (
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
                → {t('calculator.totalVolume')}: {plan?.volumeLiter.toFixed(2)}{' '}
                L
              </p>
              <p>
                → {t('calculator.traceNeeded')}: {plan?.traceAmount.toFixed(2)}{' '}
                ml
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
