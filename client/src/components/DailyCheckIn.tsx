import { useEffect, useState } from 'react';

const rewards = [5, 5, 10, 10, 15, 20, 0];

const DAY = 1;
//24 * 60 * 60 * 1000

export default function DailyCheckIn({
  onUnlockWheel,
  streak,
  setStreak,
  setPoints,
}: any) {
  const [lastCheckin, setLastCheckin] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [spinCredits, setSpinCredits] = useState(0);

  const handleSpin = () => {
    if (spinCredits === 0) return;
    onUnlockWheel();
    setSpinCredits((prev) => prev - 1);
  };

  const checkIn = () => {
    if (lastCheckin && Date.now() - lastCheckin < DAY) {
      return;
    }

    const newStreak = streak + 1;
    setTimeLeft(DAY);

    if (newStreak === 7) {
      setSpinCredits((prev) => prev + 1);
      setStreak(0);
    } else {
      setStreak(newStreak);
    }

    setLastCheckin(Date.now());
  };

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 1000 / 60 / 60);
    const m = Math.floor((ms / 1000 / 60) % 60);
    const s = Math.floor((ms / 1000) % 60);

    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    if (!lastCheckin) return;

    const diff = Date.now() - lastCheckin;

    if (diff < DAY) {
      setTimeLeft(DAY - diff);
    }
  }, [lastCheckin]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      <div className="rounded-2xl bg-[#071a26] p-6">
        <h2 className="mb-6 text-xl text-aqua">📅 Daily Check-in</h2>

        <div className="mb-6 grid grid-cols-7 gap-3">
          {rewards.map((reward, i) => {
            const day = i + 1;

            const checked = day <= streak;

            return (
              <div
                key={day}
                className={`flex h-16 flex-col items-center justify-center rounded-xl text-sm font-semibold ${checked ? 'bg-ocean text-white' : 'bg-slate-700'} `}
              >
                {day === 7 ? '🎡' : `⭐${reward}`}
                <span className="mt-1 text-xs">Day {day}</span>
              </div>
            );
          })}
        </div>

        <button
          onClick={checkIn}
          disabled={timeLeft > 0}
          className="rounded-xl bg-ocean px-6 py-3 disabled:bg-slate-600"
        >
          {timeLeft > 0
            ? `Next check-in in ${formatTime(timeLeft)}`
            : 'Check-in Today'}
        </button>
      </div>
      <div className="mb-10 rounded-2xl bg-[#071a26] p-8 shadow-xl">
        <h2 className="mb-6 text-xl">🎡 Lucky Spin</h2>

        <button
          disabled={spinCredits === 0}
          onClick={handleSpin}
          className="rounded-xl bg-ocean px-6 py-3 disabled:bg-slate-600"
        >
          {spinCredits > 0 ? `Spin Now (${spinCredits})` : 'Spin Locked'}
        </button>
      </div>
    </>
  );
}
