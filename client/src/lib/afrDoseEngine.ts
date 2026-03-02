export const AFR_RATIO = 20;
// 20ml / 100L / 1 dKH  (2ml = 0.1 dKH)

export function calculateAfrCorrection(
  tank: number,
  current: number,
  target: number,
) {
  const delta = target - current;
  if (delta <= 0) return 0;

  return (tank / 100) * delta * AFR_RATIO;
}

export function calculateAfrMaintenance(
  tank: number,
  dailyConsumption: number,
) {
  if (dailyConsumption <= 0) return 0;

  return (tank / 100) * dailyConsumption * AFR_RATIO;
}

export function splitDose(totalDose: number, delta: number, maxPerDay: number) {
  if (delta <= 0) return null;

  const days = Math.ceil(delta / maxPerDay);

  return {
    days,
    dosePerDay: totalDose / days,
    deltaPerDay: delta / days,
  };
}
