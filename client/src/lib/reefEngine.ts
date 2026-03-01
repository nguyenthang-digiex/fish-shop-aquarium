import { Brand, ElementType, reefConfig } from './reefConfig';

export function calculateMix(
  brand: Brand,
  element: ElementType,
  powderGram: number,
) {
  const config = reefConfig[brand][element];

  const volumeLiter = powderGram / config.mixRatio;
  const traceAmount = volumeLiter * config.tracePerLiter;

  return {
    volumeLiter,
    traceAmount,
  };
}

export function calculateDose(
  brand: Brand,
  element: ElementType,
  tankVolume: number,
  current: number,
  target: number,
) {
  const config = reefConfig[brand][element];
  const delta = target - current;

  if (delta <= 0) return 0;

  const dose = (delta * tankVolume) / (config.effect * 100);

  return dose;
}
