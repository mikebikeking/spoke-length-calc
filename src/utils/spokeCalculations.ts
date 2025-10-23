import type { WheelSpecs, SpokeLengthResult, CrossPattern } from '../types/spoke';

const getCrossNumber = (pattern: CrossPattern): number => {
  const crossMap: Record<CrossPattern, number> = {
    'radial': 0,
    '1x': 1,
    '2x': 2,
    '3x': 3,
    '4x': 4,
  };
  return crossMap[pattern];
};

const calculateSpokeLengthForSide = (
  erd: number,
  flangeD: number,
  centerToFlange: number,
  numberOfSpokes: number,
  numberOfCrosses: number,
  offset: number,
  side: 'left' | 'right'
): number => {
  // DT Swiss formula with offset
  const r = flangeD / 2.0;           // Flange radius
  const d = erd / 2.0;               // Rim radius
  
  // Apply offset: 
  // - Left side (non-drive): subtract offset from center-to-flange
  // - Right side (drive): add offset to center-to-flange
  const a = side === 'left' 
    ? centerToFlange - offset 
    : centerToFlange + offset;
  
  // Use spokes PER SIDE for angle calculation
  const spokesPerSide = numberOfSpokes / 2;
  
  // Calculate spoke angle
  const spokeAngleDegrees = (numberOfCrosses * 360.0) / spokesPerSide;
  const spokeAngleRadians = (spokeAngleDegrees * Math.PI) / 180.0;
  
  // Spoke length calculation
  const length = Math.sqrt(
    Math.pow(r, 2) + 
    Math.pow(d, 2) + 
    Math.pow(a, 2) - 
    (2 * d * r * Math.cos(spokeAngleRadians))
  );
  
  return length;
};

const roundSpoke = (length: number): number => {
  return Math.round(length);
};

export const calculateSpokeLength = (specs: WheelSpecs): SpokeLengthResult => {
  const crossNumber = getCrossNumber(specs.crossPattern);
  
  const leftSpoke = calculateSpokeLengthForSide(
    specs.erd,
    specs.leftFlangeD,
    specs.leftCenterToFlange,
    specs.spokeCount,
    crossNumber,
    specs.offset,
    'left'
  );
  
  const rightSpoke = calculateSpokeLengthForSide(
    specs.erd,
    specs.rightFlangeD,
    specs.rightCenterToFlange,
    specs.spokeCount,
    crossNumber,
    specs.offset,
    'right'
  );
  
  return {
    leftSpoke: Number(leftSpoke.toFixed(2)),
    rightSpoke: Number(rightSpoke.toFixed(2)),
    leftSpokeRounded: roundSpoke(leftSpoke),
    rightSpokeRounded: roundSpoke(rightSpoke),
  };
};

export const validateSpecs = (specs: WheelSpecs): string[] => {
  const errors: string[] = [];
  
  if (specs.spokeCount % 2 !== 0) {
    errors.push('Spoke count must be an even number');
  }
  
  if (specs.spokeCount < 12 || specs.spokeCount > 48) {
    errors.push('Spoke count should be between 12 and 48');
  }
  
  if (specs.erd < 400 || specs.erd > 650) {
    errors.push('ERD seems unusual (should be 400-650mm for most rims)');
  }
  
  if (specs.leftFlangeD < 20 || specs.rightFlangeD < 20) {
    errors.push('Flange diameter seems too small');
  }
  
  if (specs.leftCenterToFlange < 5 || specs.rightCenterToFlange < 5) {
    errors.push('Center to flange distance seems too small');
  }
  
  const crossNumber = getCrossNumber(specs.crossPattern);
  const maxCross = Math.floor(specs.spokeCount / 4);
  if (crossNumber > maxCross) {
    errors.push(`${specs.crossPattern} pattern not possible with ${specs.spokeCount} spokes`);
  }
  
  return errors;
};