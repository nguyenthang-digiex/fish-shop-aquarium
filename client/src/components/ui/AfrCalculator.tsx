import Input from './Input';
import { useState } from 'react';
import {
  calculateAfrCorrection,
  calculateAfrMaintenance,
  splitDose,
} from '../../lib/afrDoseEngine';
import { calculateAfrMix } from '../../lib/afrMixEngine';
import ResultCard from './ResultCard';

function AfrCalculator() {
  const [powderGram, setPowderGram] = useState(80);
  const [tank, setTank] = useState(400);
  const [current, setCurrent] = useState(7.4);
  const [target, setTarget] = useState(8);
  const [dailyConsumption, setDailyConsumption] = useState(0);

  const mix = calculateAfrMix(powderGram);

  const correctionMl = calculateAfrCorrection(tank, current, target);

  const maintenanceMl = calculateAfrMaintenance(tank, dailyConsumption);

  const delta = target - current;

  const split = splitDose(
    correctionMl,
    delta,
    0.5, // max 0.5 dKH/ngày
  );

  return (
    <div className="mx-auto max-w-4xl space-y-10 py-10">
      {/* HEADER */}
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">AFR Calculator</h1>
        <p className="text-slate-400">
          Tính toán liều All-For-Reef an toàn và chính xác
        </p>
      </div>

      {/* SECTION 1 — Tank Info */}
      <div className="space-y-6 rounded-2xl bg-slate-800 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold">Thông số bể</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Thể tích bể (L)" value={tank} onChange={setTank} />
          <Input
            label="KH hiện tại (dKH)"
            value={current}
            onChange={setCurrent}
          />
          <Input
            label="KH mục tiêu (dKH)"
            value={target}
            onChange={setTarget}
          />
          <Input
            label="Mức tiêu thụ mỗi ngày (dKH)"
            value={dailyConsumption}
            onChange={setDailyConsumption}
          />
        </div>
      </div>

      {/* SECTION 2 — AFR Strength */}
      {/*<div className="space-y-6 rounded-2xl bg-slate-800 p-8">*/}
      {/*  <h2 className="text-2xl font-semibold">AFR Strength</h2>*/}

      {/*  <div className="flex gap-4">*/}
      {/*    <button className="rounded-full bg-slate-900 px-4 py-2">*/}
      {/*      10ml / 100L / 1dKH*/}
      {/*    </button>*/}

      {/*    <button className="rounded-full bg-cyan-500 px-4 py-2">*/}
      {/*      20ml / 100L / 1dKH*/}
      {/*    </button>*/}

      {/*    <button className="rounded-full bg-slate-900 px-4 py-2">*/}
      {/*      Custom*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* SECTION 3 — Safety Mode */}
      {/*<div className="space-y-6 rounded-2xl bg-slate-800 p-8">*/}
      {/*  <h2 className="text-2xl font-semibold">Safety Mode</h2>*/}

      {/*  <div className="flex gap-4">*/}
      {/*    <button className="rounded-full bg-slate-900 px-4 py-2">*/}
      {/*      Mixed Reef*/}
      {/*    </button>*/}

      {/*    <button className="rounded-full bg-green-500 px-4 py-2">*/}
      {/*      SPS Dominant*/}
      {/*    </button>*/}
      {/*  </div>*/}

      {/*  <Input label="Tăng tối đa mỗi ngày (dKH)" />*/}
      {/*</div>*/}

      {/* SECTION 4 — Result */}
      <div className="space-y-6 rounded-2xl bg-slate-800 p-8 shadow-xl">
        <h2 className="text-2xl font-semibold">Kết quả</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {correctionMl > 0 && (
            <ResultCard
              title="Tổng AFR cần châm"
              value={`${correctionMl.toFixed(2)} ml`}
            />
          )}

          {split && (
            <>
              <ResultCard title="Chia trong" value={`${split.days} ngày`} />
              <ResultCard
                title="Mỗi ngày châm"
                value={`${split.dosePerDay.toFixed(2)} ml`}
              />
            </>
          )}

          {maintenanceMl > 0 && (
            <ResultCard
              title="Liều duy trì"
              value={`${maintenanceMl.toFixed(2)} ml/ngày`}
            />
          )}
        </div>
      </div>

      <div className="space-y-6 rounded-2xl bg-slate-800 p-8">
        <h2 className="text-2xl font-semibold">Pha dung dịch AFR</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-slate-900 p-6">
            <Input
              classLabel="text-slate-400"
              label="Gram bột AFR"
              value={powderGram}
              onChange={setPowderGram}
              className="mt-2 py-0 text-2xl font-bold text-cyan-400"
            />
          </div>

          <ResultCard
            title="Dung dịch sau pha"
            value={`${mix.volumeMl.toFixed(0)} ml`}
          />
        </div>
      </div>
    </div>
  );
}

export default AfrCalculator;
