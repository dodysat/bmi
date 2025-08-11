export const en = {
  categories: {
    underweight: {
      name: "Underweight",
      range: "BMI < 18.5",
      recommendations: [
        "Consult with a healthcare professional to determine if weight gain is needed",
        "Focus on nutrient-dense foods to gain weight healthily",
        "Consider strength training to build muscle mass",
        "Monitor for underlying health conditions",
      ],
    },
    normal_weight: {
      name: "Normal Weight",
      range: "BMI 18.5 - 24.9",
      recommendations: [
        "Maintain current weight through balanced diet and regular exercise",
        "Continue healthy lifestyle habits",
        "Regular health check-ups for preventive care",
        "Stay physically active with at least 150 minutes of moderate exercise per week",
      ],
    },
    overweight: {
      name: "Overweight",
      range: "BMI 25.0 - 29.9",
      recommendations: [
        "Consider weight reduction through caloric restriction and increased physical activity",
        "Aim for 5-10% weight loss as an initial goal",
        "Focus on sustainable lifestyle changes",
        "Consult healthcare professional for personalized weight management plan",
      ],
    },
    obese_class_i: {
      name: "Obese Class I",
      range: "BMI 30.0 - 34.9",
      recommendations: [
        "Weight reduction is recommended to reduce health risks",
        "Combine dietary changes with regular physical activity",
        "Consider professional guidance from dietitian or healthcare provider",
        "Monitor for obesity-related health conditions (diabetes, hypertension, etc.)",
      ],
    },
    obese_class_ii: {
      name: "Obese Class II",
      range: "BMI 35.0 - 39.9",
      recommendations: [
        "Significant weight reduction recommended to reduce serious health risks",
        "Seek professional medical guidance for comprehensive weight management",
        "Consider medically supervised weight loss programs",
        "Regular monitoring for cardiovascular and metabolic complications",
      ],
    },
    obese_class_iii: {
      name: "Obese Class III (Severe Obesity)",
      range: "BMI ≥ 40.0",
      recommendations: [
        "Immediate medical consultation recommended for severe obesity management",
        "Consider bariatric surgery evaluation if other methods have failed",
        "Comprehensive medical care for obesity-related comorbidities",
        "Multidisciplinary approach including nutrition, exercise, and psychological support",
      ],
    },
  },
  errors: {
    weight_positive: "Weight must be a positive number in kilograms",
    height_positive: "Height must be a positive number in meters",
    height_unrealistic:
      "Height seems unusually high. Please ensure height is in meters, not centimeters",
    weight_unrealistic:
      "Weight seems unusually high. Please ensure weight is in kilograms",
    cm_positive: "Height in centimeters must be a positive number",
    lbs_positive: "Weight in pounds must be a positive number",
  },
  units: {
    kg: "kg",
    m: "m",
    cm: "cm",
    lbs: "lbs",
    feet: "feet",
    inches: "inches",
  },
};
