export type SaltBrand =
  | 'fauna'
  | 'tropicPro'
  | 'tropicSyn'
  | 'redSeaBlue'
  | 'redSeaPurple'
  | 'aquaForest'
  | 'blueTreasure';

export type SaltMode = 'new' | 'change' | 'correct';

const SALT_TABLE: Record<SaltBrand, number> = {
  fauna: 38,
  tropicPro: 38,
  tropicSyn: 38.5,
  redSeaBlue: 38,
  redSeaPurple: 39.5,
  aquaForest: 39,
  blueTreasure: 38.5,
};

export function calculateSalt({
  tankLiter,
  waterChangeLiter,
  currentPpt,
  targetPpt,
  brand,
  mode,
}: {
  tankLiter: number;
  waterChangeLiter?: number;
  currentPpt?: number;
  targetPpt?: number;
  brand: SaltBrand;
  mode: SaltMode;
}) {
  const gramPerLiter = SALT_TABLE[brand];

  if (mode === 'new') {
    return tankLiter * gramPerLiter;
  }

  if (mode === 'change') {
    return (waterChangeLiter || 0) * gramPerLiter;
  }

  if (mode === 'correct') {
    const delta = (targetPpt || 0) - (currentPpt || 0);
    return tankLiter * delta;
  }

  return 0;
}

export function pptToSG(ppt: number) {
  return 1 + (ppt * 0.75) / 1000;
}

export function sgToPpt(sg: number) {
  console.log('sg', sg);
  return ((sg - 1) * 1000) / 0.75;
}
