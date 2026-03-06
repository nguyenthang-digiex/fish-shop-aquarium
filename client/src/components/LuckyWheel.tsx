import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import confetti from 'canvas-confetti';
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';

const rewards: WheelData[] = [
  { option: 'Try Again' },
  { option: '10% OFF' },
  { option: '20% OFF' },
  { option: '50% OFF' },
  { option: 'Free Shipping' },
  { option: 'Voucher 50K' },
  { option: 'Voucher 100K' },
  { option: 'Free Coral Frag' },
];

const weights = [
  { index: 0, weight: 40 },
  { index: 1, weight: 10 },
  { index: 2, weight: 8 },
  { index: 3, weight: 2 },
  { index: 4, weight: 20 },
  { index: 5, weight: 10 },
  { index: 6, weight: 7 },
  { index: 7, weight: 3 },
];

export default function LuckyWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  function weightedRandom() {
    const total = weights.reduce((sum, w) => sum + w.weight, 0);

    let random = Math.random() * total;

    for (let w of weights) {
      if (random < w.weight) return w.index;
      random -= w.weight;
    }

    return 0;
  }

  const spin = () => {
    const selectedIndex = weightedRandom();

    setPrizeNumber(selectedIndex);
    setMustSpin(true);
  };

  const handleStop = () => {
    setMustSpin(false);
    setShowPopup(true);

    // 🎆 pháo hoa
    confetti({
      particleCount: 120,
      spread: 90,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={rewards}
        backgroundColors={['#22d3ee', '#0284c7', '#f43f5e', '#0ea5e9']}
        textColors={['#ffffff']}
        outerBorderColor="#0f172a"
        onStopSpinning={handleStop}
      />

      <button
        onClick={spin}
        className="rounded bg-ocean px-6 py-3 text-white hover:bg-600"
      >
        Quay ngay
      </button>

      {/* POPUP */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="rounded-lg bg-sand p-10 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-2xl font-bold text-deep">🎉 Chúc mừng!</h2>

            <p className="mb-6 text-lg">
              Bạn nhận được:
              <span className="ml-2 font-semibold text-ocean">
                {rewards[prizeNumber].option}
              </span>
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="rounded bg-ocean px-6 py-3 text-white hover:bg-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
