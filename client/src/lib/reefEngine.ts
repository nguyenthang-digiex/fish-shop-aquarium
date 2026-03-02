import { reefConfig, reefModes } from './reefConfig';

export function calculateReefPlan({
  brand,
  element,
  reefType,
  tankVolume,
  current,
  target,
  dailyConsumption = 0,
  powderGram = 0,
}: {
  brand: any;
  element: any;
  reefType: any;
  tankVolume: number;
  current: number;
  target: number;
  dailyConsumption?: number;
  powderGram?: number;
}) {
  const config = reefConfig[brand][element];

  const delta = target - current;
  const maxPerDay =
    element === 'kh'
      ? reefModes[reefType].khMaxPerDay
      : element === 'ca'
        ? reefModes[reefType].caMaxPerDay
        : reefModes[reefType].mgMaxPerDay;

  let daysNeeded = 0;
  let deltaPerDay = 0;
  let totalDose = 0;
  let dosePerDay = 0;
  let timeline: { day: number; value: number }[] = [];

  const volumeLiter = powderGram / config.mixRatio;
  const traceAmount = volumeLiter * config.tracePerLiter;

  if (delta > 0) {
    daysNeeded = Math.ceil(delta / maxPerDay);
    deltaPerDay = delta / daysNeeded;

    totalDose = (delta * tankVolume) / (config.effect * 100);

    dosePerDay = totalDose / daysNeeded;

    timeline = Array.from({ length: daysNeeded }, (_, i) => ({
      day: i + 1,
      value: current + deltaPerDay * (i + 1),
    }));
  }

  // 🔥 Maintenance dose
  let maintenanceDose = 0;

  if (dailyConsumption > 0) {
    maintenanceDose = (dailyConsumption * tankVolume) / (config.effect * 100);
  }

  return {
    delta,
    daysNeeded,
    deltaPerDay,
    totalDose,
    dosePerDay,
    maintenanceDose,
    timeline,
    volumeLiter,
    traceAmount,
  };
}
