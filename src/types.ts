/**
 * WHO BMI categories according to World Health Organization standards
 */
export enum BMICategory {
  UNDERWEIGHT = 'underweight',
  NORMAL_WEIGHT = 'normal_weight',
  OVERWEIGHT = 'overweight',
  OBESE_CLASS_I = 'obese_class_i',
  OBESE_CLASS_II = 'obese_class_ii',
  OBESE_CLASS_III = 'obese_class_iii'
}

/**
 * BMI calculation result containing BMI value, category, and health recommendations
 */
export interface BMIResult {
  /** The calculated BMI value */
  bmi: number;
  /** WHO BMI category */
  category: BMICategory;
  /** Descriptive category name */
  categoryName: string;
  /** BMI range for the category */
  range: string;
  /** Health recommendations based on WHO guidelines */
  recommendations: string[];
}

/**
 * Input parameters for BMI calculation
 */
export interface BMIInput {
  /** Weight in kilograms */
  weight: number;
  /** Height in meters */
  height: number;
  /** Locale for localized output (optional, defaults to 'en') */
  locale?: 'en' | 'id';
}

/**
 * WHO BMI category thresholds
 */
export interface BMIThresholds {
  underweight: number;
  normalWeight: number;
  overweight: number;
  obeseClassI: number;
  obeseClassII: number;
  obeseClassIII: number;
}
