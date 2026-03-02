export type Brand = 'fauna' | 'aquaForest' | 'coralEssential';
export type ElementType = 'kh' | 'ca' | 'mg';

export const reefConfig: any = {
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

export const safetyLimits: any = {
  kh: 1,
  ca: 50,
  mg: 100,
};

export const reefModes: any = {
  mixed: {
    khMaxPerDay: 1,
    caMaxPerDay: 50,
    mgMaxPerDay: 100,
  },
  sps: {
    khMaxPerDay: 0.5,
    caMaxPerDay: 30,
    mgMaxPerDay: 50,
  },
};
