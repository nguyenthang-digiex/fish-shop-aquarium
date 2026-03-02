import { useMemo, useState } from 'react';
import Input from './Input';
import {
  calculateSalt,
  pptToSG,
  SaltBrand,
  SaltMode,
  sgToPpt,
} from '../../lib/saltEngine';

export default function SaltProPage() {
  const [brand, setBrand] = useState<SaltBrand>('fauna');
  const [mode, setMode] = useState<SaltMode>('new');

  const [tankLiter, setTankLiter] = useState(100);
  const [waterChangeLiter, setWaterChangeLiter] = useState(20);
  const [currentInput, setCurrentInput] = useState(35);
  const [targetInput, setTargetInput] = useState(35);
  const [unit, setUnit] = useState<'ppt' | 'sg'>('ppt');

  const displayCurrent = unit === 'ppt' ? currentInput : pptToSG(currentInput);

  const displayTarget = unit === 'ppt' ? targetInput : pptToSG(targetInput);

  const saltGram = useMemo(() => {
    let current = displayCurrent;
    let target = displayTarget;

    if (unit === 'sg') {
      current = sgToPpt(displayCurrent);
      target = sgToPpt(displayTarget);
    }

    return calculateSalt({
      tankLiter,
      waterChangeLiter,
      currentPpt: current,
      targetPpt: target,
      brand,
      mode,
    });
  }, [
    tankLiter,
    waterChangeLiter,
    currentInput,
    targetInput,
    brand,
    mode,
    unit,
  ]);

  const saltKg = saltGram / 1000;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Salt Calculator Pro</h1>

      {/* Brand */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value as SaltBrand)}
        className="w-full rounded-lg bg-slate-900 p-3"
      >
        <option value="fauna">Fauna Marin</option>
        <option value="tropicPro">Tropic Marin Pro</option>
        <option value="tropicSyn">Tropic Marin Syn-Biotic</option>
        <option value="redSeaBlue">Red Sea Blue</option>
        <option value="redSeaPurple">Red Sea Coral Pro</option>
        <option value="aquaForest">Aquaforest</option>
        <option value="blueTreasure">Blue Treasure</option>
      </select>

      {/* Mode Toggle */}
      <div className="flex gap-3">
        {[
          { key: 'new', label: 'New Tank' },
          { key: 'change', label: 'Water Change' },
          { key: 'correct', label: 'Correct Salinity' },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key as SaltMode)}
            className={`rounded-full px-4 py-2 ${
              mode === m.key ? 'bg-cyan-500' : 'bg-slate-800'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Dynamic Inputs */}

      {mode === 'new' && (
        <Input
          label="Tank Volume (L)"
          value={tankLiter}
          onChange={setTankLiter}
        />
      )}

      {mode === 'change' && (
        <Input
          label="Water Change Volume (L)"
          value={waterChangeLiter}
          onChange={setWaterChangeLiter}
        />
      )}

      {mode === 'correct' && (
        <>
          <div className="flex gap-3">
            <button
              onClick={() => setUnit('ppt')}
              className={`rounded-full px-4 py-2 ${
                unit === 'ppt' ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              PPT
            </button>

            <button
              onClick={() => setUnit('sg')}
              className={`rounded-full px-4 py-2 ${
                unit === 'sg' ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              SG
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Tank (L)" value={tankLiter} onChange={setTankLiter} />

            <Input
              label={`Current (${unit.toUpperCase()})`}
              value={displayCurrent}
              onChange={(val) => {
                if (unit === 'ppt') {
                  setCurrentInput(val);
                } else {
                  setCurrentInput(sgToPpt(val));
                }
              }}
            />

            <Input
              label={`Target (${unit.toUpperCase()})`}
              value={displayTarget}
              onChange={(val) => {
                if (unit === 'ppt') {
                  setTargetInput(val);
                } else {
                  setTargetInput(sgToPpt(val));
                }
              }}
            />
          </div>

          {mode === 'correct' && (
            <div className="text-sm text-slate-400">
              {unit === 'ppt' ? (
                <>≈ {pptToSG(displayTarget).toFixed(3)} SG</>
              ) : (
                <>≈ {sgToPpt(displayTarget).toFixed(1)} ppt</>
              )}
            </div>
          )}
        </>
      )}

      {/* Result */}
      <div className="rounded-xl bg-slate-900 p-6">
        <p className="text-slate-400">Muối cần:</p>
        <p className="text-3xl font-bold text-cyan-400">
          {saltGram.toFixed(0)} g
        </p>

        {saltKg >= 1 && (
          <p className="mt-2 text-slate-400">≈ {saltKg.toFixed(2)} kg</p>
        )}
      </div>
    </div>
  );
}
