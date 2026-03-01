import { useState } from 'react';
import KhCalculator from '../components/ui/KhCalculator';

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<'kh' | 'afr' | 'volume'>('kh');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-4 text-4xl font-bold">Reef Calculator</h1>
        <p className="text-slate-400">
          Công cụ tính toán thông minh dành cho người chơi reef.
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex gap-4">
          {[
            { key: 'kh', label: 'KH Dosing' },
            { key: 'afr', label: 'AFR Consumption' },
            { key: 'volume', label: 'Tank Volume' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`rounded-full px-5 py-2 transition ${
                activeTab === tab.key
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calculator Card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
          {activeTab === 'kh' && <KhCalculator />}
          {/*{activeTab === 'afr' && <AfrCalculator />}*/}
          {/*{activeTab === 'volume' && <VolumeCalculator />}*/}
        </div>
      </div>
    </div>
  );
}
