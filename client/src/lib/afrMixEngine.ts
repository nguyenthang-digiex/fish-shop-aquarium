export const AFR_DEFAULT_RATIO = 500 / 80;
// 6.25 ml dung dịch / 1g bột

export function calculateAfrMix(powderGram: number) {
  const volumeMl = powderGram * AFR_DEFAULT_RATIO;

  return {
    volumeMl,
    concentration: powderGram / volumeMl, // g/ml
  };
}
