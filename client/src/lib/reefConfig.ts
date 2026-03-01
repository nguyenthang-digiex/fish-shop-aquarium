export type Brand = 'fauna' | 'aquaForest' | 'coralEssential';
export type ElementType = 'kh' | 'ca' | 'mg';

export const reefConfig = {
  fauna: {
    kh: { mixRatio: 100, tracePerLiter: 0, effect: 0.05 },
    ca: { mixRatio: 400, tracePerLiter: 5, effect: 0.5 },
    mg: { mixRatio: 400, tracePerLiter: 0, effect: 0.5 },
  },
  aquaForest: {
    kh: { mixRatio: 100, tracePerLiter: 0, effect: 0.05 },
    ca: { mixRatio: 400, tracePerLiter: 5, effect: 0.5 },
    mg: { mixRatio: 400, tracePerLiter: 0, effect: 0.5 },
  },
  coralEssential: {
    kh: { mixRatio: 100, tracePerLiter: 0, effect: 0.08 },
    ca: { mixRatio: 400, tracePerLiter: 5, effect: 0.8 },
    mg: { mixRatio: 400, tracePerLiter: 0, effect: 0.8 },
  },
} as const;
