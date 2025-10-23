export type CrossPattern = 'radial' | '1x' | '2x' | '3x' | '4x';

export interface WheelSpecs {
  erd: number;
  spokeCount: number;
  leftFlangeD: number;
  rightFlangeD: number;
  leftCenterToFlange: number;
  rightCenterToFlange: number;
  crossPattern: CrossPattern;
  offset: number;
}

export interface SpokeLengthResult {
  leftSpoke: number;
  rightSpoke: number;
  leftSpokeRounded: number;
  rightSpokeRounded: number;
}