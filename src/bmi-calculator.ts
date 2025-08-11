import { BMICategory, BMIResult, BMIInput, BMIThresholds } from "./types";
import { getLocale, Locale } from "./locales";

/**
 * WHO BMI thresholds according to World Health Organization standards
 */
export const WHO_BMI_THRESHOLDS: BMIThresholds = {
  underweight: 18.5,
  normalWeight: 25.0,
  overweight: 30.0,
  obeseClassI: 35.0,
  obeseClassII: 40.0,
  obeseClassIII: Infinity,
};

/**
 * Get BMI category information for the specified locale
 */
function getBMICategoryInfo(category: BMICategory, locale: Locale = 'en') {
  const localeData = getLocale(locale);
  
  switch (category) {
    case BMICategory.UNDERWEIGHT:
      return localeData.categories.underweight;
    case BMICategory.NORMAL_WEIGHT:
      return localeData.categories.normal_weight;
    case BMICategory.OVERWEIGHT:
      return localeData.categories.overweight;
    case BMICategory.OBESE_CLASS_I:
      return localeData.categories.obese_class_i;
    case BMICategory.OBESE_CLASS_II:
      return localeData.categories.obese_class_ii;
    case BMICategory.OBESE_CLASS_III:
      return localeData.categories.obese_class_iii;
    default:
      return localeData.categories.normal_weight;
  }
}

/**
 * Validates BMI calculation input parameters
 * @param input - The input parameters to validate
 * @param locale - The locale for error messages
 * @throws Error if input parameters are invalid
 */
function validateInput(input: BMIInput, locale: Locale = 'en'): void {
  const localeData = getLocale(locale);
  
  if (typeof input.weight !== "number" || input.weight <= 0) {
    throw new Error(localeData.errors.weight_positive);
  }

  if (typeof input.height !== "number" || input.height <= 0) {
    throw new Error(localeData.errors.height_positive);
  }

  if (input.height > 3) {
    throw new Error(localeData.errors.height_unrealistic);
  }

  if (input.weight > 1000) {
    throw new Error(localeData.errors.weight_unrealistic);
  }
}

/**
 * Determines BMI category based on calculated BMI value using WHO standards
 * @param bmi - The calculated BMI value
 * @returns The corresponding BMI category
 */
function getBMICategory(bmi: number): BMICategory {
  if (bmi < WHO_BMI_THRESHOLDS.underweight) {
    return BMICategory.UNDERWEIGHT;
  } else if (bmi < WHO_BMI_THRESHOLDS.normalWeight) {
    return BMICategory.NORMAL_WEIGHT;
  } else if (bmi < WHO_BMI_THRESHOLDS.overweight) {
    return BMICategory.OVERWEIGHT;
  } else if (bmi < WHO_BMI_THRESHOLDS.obeseClassI) {
    return BMICategory.OBESE_CLASS_I;
  } else if (bmi < WHO_BMI_THRESHOLDS.obeseClassII) {
    return BMICategory.OBESE_CLASS_II;
  } else {
    return BMICategory.OBESE_CLASS_III;
  }
}

/**
 * Calculates BMI according to WHO standards
 * Formula: BMI = weight (kg) / height (m)²
 *
 * @param input - Object containing weight in kg and height in meters
 * @returns BMI calculation result with category and recommendations
 * @throws Error if input parameters are invalid
 *
 * @example
 * ```typescript
 * const result = calculateBMI({ weight: 70, height: 1.75 });
 * console.log(result.bmi); // 22.86
 * console.log(result.category); // BMICategory.NORMAL_WEIGHT
 * ```
 */
export function calculateBMI(input: BMIInput): BMIResult {
  const locale = input.locale || 'en';
  validateInput(input, locale);

  const bmi =
    Math.round((input.weight / (input.height * input.height)) * 100) / 100;
  const category = getBMICategory(bmi);
  const categoryInfo = getBMICategoryInfo(category, locale);

  return {
    bmi,
    category,
    categoryName: categoryInfo.name,
    range: categoryInfo.range,
    recommendations: categoryInfo.recommendations,
  };
}

/**
 * Convenience function to calculate BMI with separate weight and height parameters
 * @param weight - Weight in kilograms
 * @param height - Height in meters
 * @param locale - Locale for localized output (optional, defaults to 'en')
 * @returns BMI calculation result
 */
export function calculateBMISimple(weight: number, height: number, locale: Locale = 'en'): BMIResult {
  return calculateBMI({ weight, height, locale });
}

/**
 * Converts height from centimeters to meters
 * @param heightInCm - Height in centimeters
 * @param locale - Locale for error messages (optional, defaults to 'en')
 * @returns Height in meters
 */
export function cmToMeters(heightInCm: number, locale: Locale = 'en'): number {
  if (typeof heightInCm !== "number" || heightInCm <= 0) {
    const localeData = getLocale(locale);
    throw new Error(localeData.errors.cm_positive);
  }
  return heightInCm / 100;
}

/**
 * Converts weight from pounds to kilograms
 * @param weightInLbs - Weight in pounds
 * @param locale - Locale for error messages (optional, defaults to 'en')
 * @returns Weight in kilograms
 */
export function lbsToKg(weightInLbs: number, locale: Locale = 'en'): number {
  if (typeof weightInLbs !== "number" || weightInLbs <= 0) {
    const localeData = getLocale(locale);
    throw new Error(localeData.errors.lbs_positive);
  }
  return Math.round(weightInLbs * 0.453592 * 100) / 100;
}

/**
 * Calculates BMI using imperial units (pounds and feet/inches)
 * @param weightInLbs - Weight in pounds
 * @param heightInFeet - Height in feet
 * @param heightInInches - Additional inches (optional, default 0)
 * @param locale - Locale for localized output (optional, defaults to 'en')
 * @returns BMI calculation result
 */
export function calculateBMIImperial(
  weightInLbs: number,
  heightInFeet: number,
  heightInInches: number = 0,
  locale: Locale = 'en'
): BMIResult {
  const weightInKg = lbsToKg(weightInLbs, locale);
  const totalInches = heightInFeet * 12 + heightInInches;
  const heightInMeters = totalInches * 0.0254;

  return calculateBMI({ weight: weightInKg, height: heightInMeters, locale });
}
