import { BMICategory, BMIResult, BMIInput, BMIThresholds } from "./types";

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
 * BMI category information including names, ranges, and recommendations
 */
const BMI_CATEGORY_INFO = {
  [BMICategory.UNDERWEIGHT]: {
    name: "Underweight",
    range: "BMI < 18.5",
    recommendations: [
      "Consult with a healthcare professional to determine if weight gain is needed",
      "Focus on nutrient-dense foods to gain weight healthily",
      "Consider strength training to build muscle mass",
      "Monitor for underlying health conditions",
    ],
  },
  [BMICategory.NORMAL_WEIGHT]: {
    name: "Normal Weight",
    range: "BMI 18.5 - 24.9",
    recommendations: [
      "Maintain current weight through balanced diet and regular exercise",
      "Continue healthy lifestyle habits",
      "Regular health check-ups for preventive care",
      "Stay physically active with at least 150 minutes of moderate exercise per week",
    ],
  },
  [BMICategory.OVERWEIGHT]: {
    name: "Overweight",
    range: "BMI 25.0 - 29.9",
    recommendations: [
      "Consider weight reduction through caloric restriction and increased physical activity",
      "Aim for 5-10% weight loss as an initial goal",
      "Focus on sustainable lifestyle changes",
      "Consult healthcare professional for personalized weight management plan",
    ],
  },
  [BMICategory.OBESE_CLASS_I]: {
    name: "Obese Class I",
    range: "BMI 30.0 - 34.9",
    recommendations: [
      "Weight reduction is recommended to reduce health risks",
      "Combine dietary changes with regular physical activity",
      "Consider professional guidance from dietitian or healthcare provider",
      "Monitor for obesity-related health conditions (diabetes, hypertension, etc.)",
    ],
  },
  [BMICategory.OBESE_CLASS_II]: {
    name: "Obese Class II",
    range: "BMI 35.0 - 39.9",
    recommendations: [
      "Significant weight reduction recommended to reduce serious health risks",
      "Seek professional medical guidance for comprehensive weight management",
      "Consider medically supervised weight loss programs",
      "Regular monitoring for cardiovascular and metabolic complications",
    ],
  },
  [BMICategory.OBESE_CLASS_III]: {
    name: "Obese Class III (Severe Obesity)",
    range: "BMI ≥ 40.0",
    recommendations: [
      "Immediate medical consultation recommended for severe obesity management",
      "Consider bariatric surgery evaluation if other methods have failed",
      "Comprehensive medical care for obesity-related comorbidities",
      "Multidisciplinary approach including nutrition, exercise, and psychological support",
    ],
  },
};

/**
 * Validates BMI calculation input parameters
 * @param input - The input parameters to validate
 * @throws Error if input parameters are invalid
 */
function validateInput(input: BMIInput): void {
  if (typeof input.weight !== "number" || input.weight <= 0) {
    throw new Error("Weight must be a positive number in kilograms");
  }

  if (typeof input.height !== "number" || input.height <= 0) {
    throw new Error("Height must be a positive number in meters");
  }

  if (input.height > 3) {
    throw new Error(
      "Height seems unusually high. Please ensure height is in meters, not centimeters"
    );
  }

  if (input.weight > 1000) {
    throw new Error(
      "Weight seems unusually high. Please ensure weight is in kilograms"
    );
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
  validateInput(input);

  const bmi =
    Math.round((input.weight / (input.height * input.height)) * 100) / 100;
  const category = getBMICategory(bmi);
  const categoryInfo = BMI_CATEGORY_INFO[category];

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
 * @returns BMI calculation result
 */
export function calculateBMISimple(weight: number, height: number): BMIResult {
  return calculateBMI({ weight, height });
}

/**
 * Converts height from centimeters to meters
 * @param heightInCm - Height in centimeters
 * @returns Height in meters
 */
export function cmToMeters(heightInCm: number): number {
  if (typeof heightInCm !== "number" || heightInCm <= 0) {
    throw new Error("Height in centimeters must be a positive number");
  }
  return heightInCm / 100;
}

/**
 * Converts weight from pounds to kilograms
 * @param weightInLbs - Weight in pounds
 * @returns Weight in kilograms
 */
export function lbsToKg(weightInLbs: number): number {
  if (typeof weightInLbs !== "number" || weightInLbs <= 0) {
    throw new Error("Weight in pounds must be a positive number");
  }
  return Math.round(weightInLbs * 0.453592 * 100) / 100;
}

/**
 * Calculates BMI using imperial units (pounds and feet/inches)
 * @param weightInLbs - Weight in pounds
 * @param heightInFeet - Height in feet
 * @param heightInInches - Additional inches (optional, default 0)
 * @returns BMI calculation result
 */
export function calculateBMIImperial(
  weightInLbs: number,
  heightInFeet: number,
  heightInInches: number = 0
): BMIResult {
  const weightInKg = lbsToKg(weightInLbs);
  const totalInches = heightInFeet * 12 + heightInInches;
  const heightInMeters = totalInches * 0.0254;

  return calculateBMI({ weight: weightInKg, height: heightInMeters });
}
