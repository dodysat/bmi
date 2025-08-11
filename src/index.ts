// Export types
export * from "./types";

// Export main BMI calculator functions
export {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
  WHO_BMI_THRESHOLDS,
} from "./bmi-calculator";

// Export everything as default for convenience
import {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
  WHO_BMI_THRESHOLDS,
} from "./bmi-calculator";

import { BMICategory, BMIResult, BMIInput, BMIThresholds } from "./types";

export default {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
  WHO_BMI_THRESHOLDS,
  BMICategory,
};
