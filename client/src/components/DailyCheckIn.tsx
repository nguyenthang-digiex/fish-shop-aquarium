import { useEffect, useState } from 'react';

type DayStatus = 'pending' | 'done' | 'miss';

const DAY = 24 * 60 * 60 * 1000; // test 10s

const rewards = [5, 5, 10, 10, 15, 20, 0];

export default function DailyCheckIn({
  onUnlockWheel,
  setStreak,
  addPoint,
}: any) {
  const [days, setDays] = useState<DayStatus[]>(Array(7).fill('pending'));
  const [currentDay, setCurrentDay] = useState(0);
  const [lastCheckin, setLastCheckin] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [spinCredits, setSpinCredits] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  const handleSpin = () => {
    if (spinCredits === 0) return;

    onUnlockWheel();
    setSpinCredits((prev: number) => prev - 1);
  };

  const checkIn = () => {
    if (days[currentDay] !== 'pending') return;

    const newDays = [...days];

    newDays[currentDay] = 'done';

    setDays(newDays);

    setStreak((prev: number) => prev + 1);

    addPoint((prev: number) => prev + rewards[currentDay]);

    setLastCheckin(Date.now());
    setTimeLeft(DAY);
    setCooldown(true);
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!lastCheckin) return;

      const diff = Date.now() - lastCheckin;

      const remaining = DAY - diff;

      setTimeLeft(Math.max(remaining, 0));

      if (diff >= DAY) {
        setCooldown(false);
        setDays((prevDays) => {
          const newDays = [...prevDays];

          if (newDays[currentDay] === 'pending') {
            newDays[currentDay] = 'miss';
            setStreak(0);
          }

          return newDays;
        });

        setCurrentDay((prev) => prev + 1);

        setLastCheckin(Date.now());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastCheckin, currentDay]);

  useEffect(() => {
    if (days.every((d) => d === 'done')) {
      setSpinCredits((prev) => prev + 1);
    }
  }, [days]);

  return (
    <div className="rounded-2xl bg-[#071a26] p-6">
      <h2 className="mb-6 text-xl text-aqua">📅 Daily Check-in</h2>

      <div className="mb-6 grid grid-cols-7 gap-3">
        {days.map((d, i) => {
          return (
            <div
              key={i}
              className={`flex h-16 flex-col items-center justify-center rounded-xl font-semibold ${d === 'done' && 'bg-ocean text-white'} ${d === 'miss' && 'bg-red-500 text-white'} ${d === 'pending' && 'bg-slate-700'} `}
            >
              {d === 'done' && '✔'}
              {d === 'miss' && '✖'}
              {d === 'pending' && i + 1}
            </div>
          );
        })}
      </div>

      <button
        onClick={checkIn}
        disabled={days[currentDay] !== 'pending'}
        className="rounded-xl bg-ocean px-6 py-3 disabled:bg-slate-600"
      >
        {cooldown ? `Next in ${formatTime(timeLeft)}` : 'Check-in Today'}
      </button>

      <div className="mt-6">
        <button
          onClick={handleSpin}
          disabled={spinCredits === 0}
          className="rounded-xl bg-aqua px-6 py-3 text-deep disabled:bg-slate-600"
        >
          🎡 Spin Now ({spinCredits})
        </button>
      </div>
    </div>
  );
}
