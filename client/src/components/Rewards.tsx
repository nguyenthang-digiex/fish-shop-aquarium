import { useState } from 'react';
import LuckyWheel from '../components/LuckyWheel';
import DailyCheckIn from './DailyCheckIn';

export default function Rewards() {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showWheel, setShowWheel] = useState(false);

  const days = [1, 2, 3, 4, 5, 6, 7];

  const handleOpenWheel = () => {
    setShowWheel(true);
  };

  return (
    <div className="min-h-screen bg-deep p-10 text-sand">
      <h1 className="mb-10 text-3xl font-bold text-aqua">🎁 Rewards Center</h1>

      {/* STATS */}
      <div className="mb-10 grid gap-6 md:grid-cols-3">
        <StatCard title="Points" value={points} icon="⭐" />

        <StatCard title="Level" value="Coral Keeper" icon="🪸" />

        <StatCard title="Streak" value={`${streak} days`} icon="🔥" />
      </div>

      {/* DAILY CHECKIN */}
      <DailyCheckIn
        onUnlockWheel={handleOpenWheel}
        setStreak={setStreak}
        addPoint={setPoints}
      />

      {/* SHOP */}
      <div className="rounded-2xl bg-[#071a26] p-8 shadow-xl">
        <h2 className="mb-6 text-xl">🛒 Reward Shop</h2>

        <div className="grid gap-6 md:grid-cols-4">
          <RewardCard title="10% OFF" points={100} />
          <RewardCard title="Free Shipping" points={200} />
          <RewardCard title="Voucher 100K" points={500} />
          <RewardCard title="Coral Frag" points={1000} />
        </div>
      </div>

      {/* WHEEL POPUP */}
      {showWheel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="rounded-xl bg-deep p-10 text-black shadow-2xl">
            <LuckyWheel />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[#071a26] p-6 shadow-xl">
      <div className="text-3xl">{icon}</div>

      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function RewardCard({ title, points }: any) {
  return (
    <div className="rounded-xl bg-slate-800 p-4 text-center transition hover:bg-slate-700">
      <p className="mb-4">{title}</p>

      <button className="rounded-lg bg-aqua px-4 py-2 text-deep">
        {points} pts
      </button>
    </div>
  );
}
