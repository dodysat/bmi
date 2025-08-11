// Export types
export * from "./types";

// Export locale functions
export {
  getLocale,
  getSupportedLocales,
  isLocaleSupported,
  type Locale,
  type LocaleData
} from "./locales";

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
import { getLocale, getSupportedLocales, isLocaleSupported, type Locale, type LocaleData } from "./locales";

export default {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
  WHO_BMI_THRESHOLDS,
  BMICategory,
  getLocale,
  getSupportedLocales,
  isLocaleSupported,
};
