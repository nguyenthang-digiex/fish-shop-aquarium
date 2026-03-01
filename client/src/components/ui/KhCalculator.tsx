import { useState } from 'react';
import Input from './Input';

const brandFactors = {
  fauna: 0.05,
  coralEssential: 0.08,
  aquaForest: 0.025,
};

export default function KhCalculator() {
  const [tank, setTank] = useState(100);
  const [currentKh, setCurrentKh] = useState(7);
  const [targetKh, setTargetKh] = useState(8);
  const [brand, setBrand] = useState<'fauna' | 'coralEssential' | 'aquaForest'>(
    'fauna',
  );

  const factor = brandFactors[brand];

  const difference = targetKh - currentKh;
  const result =
    difference > 0 ? ((difference * tank) / (factor * 100)).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">KH Dosing Calculator</h2>

      {/* Brand selector */}
      <div>
        <label className="mb-2 block text-sm text-slate-400">
          Chọn sản phẩm
        </label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value as any)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 focus:border-cyan-400"
        >
          <option value="fauna">Fauna Marin</option>
          <option value="coralEssential">Coral Essentials</option>
          <option value="aquaForest">Aquaforest</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Input label="Tank Volume (L)" value={tank} onChange={setTank} />
        <Input label="Current KH" value={currentKh} onChange={setCurrentKh} />
        <Input label="Target KH" value={targetKh} onChange={setTargetKh} />
      </div>

      <div className="mt-6 rounded-xl border border-cyan-500/30 bg-slate-900 p-6">
        <p className="text-slate-400">Liều đề xuất:</p>
        <p className="mt-2 text-3xl font-bold text-cyan-400">{result} ml</p>
      </div>
    </div>
  );
}
