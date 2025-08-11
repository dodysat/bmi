import {
  calculateBMI,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
  BMICategory,
  BMIResult,
  BMIInput,
} from "@dodysat/bmi";

console.log("=== BMI Calculator TypeScript Examples ===\n");

// Example 1: Basic BMI calculation with type safety
console.log("1. Basic BMI Calculation with Type Safety:");
const input: BMIInput = { weight: 70, height: 1.75 };
const result1: BMIResult = calculateBMI(input);
console.log(`   Weight: ${input.weight}kg, Height: ${input.height}m`);
console.log(`   BMI: ${result1.bmi}`);
console.log(`   Category: ${result1.categoryName}`);
console.log(`   Range: ${result1.range}`);
console.log("");

// Example 2: Using enums and type checking
console.log("2. Using Enums and Type Checking:");
const result2 = calculateBMI({ weight: 80, height: 1.7 });

if (result2.category === BMICategory.OVERWEIGHT) {
  console.log(`   BMI ${result2.bmi} indicates overweight status`);
  console.log(`   Recommendations for overweight:`);
  result2.recommendations.forEach((rec) => console.log(`     - ${rec}`));
}
console.log("");

// Example 3: Function with proper typing
console.log("3. Function with Proper Typing:");
function analyzeBMI(weight: number, height: number): void {
  try {
    const result = calculateBMI({ weight, height });
    console.log(`   Analysis for ${weight}kg, ${height}m:`);
    console.log(`   BMI: ${result.bmi}`);
    console.log(`   Category: ${result.categoryName}`);

    // Type-safe category checking
    switch (result.category) {
      case BMICategory.UNDERWEIGHT:
        console.log(`   ⚠️  Consider consulting a healthcare professional`);
        break;
      case BMICategory.NORMAL_WEIGHT:
        console.log(`   ✅ Maintain your healthy lifestyle`);
        break;
      case BMICategory.OVERWEIGHT:
      case BMICategory.OBESE_CLASS_I:
      case BMICategory.OBESE_CLASS_II:
      case BMICategory.OBESE_CLASS_III:
        console.log(`   ⚠️  Consider weight management strategies`);
        break;
    }
  } catch (error) {
    console.error(
      `   Error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

analyzeBMI(70, 1.75);
analyzeBMI(90, 1.7);
console.log("");

// Example 4: Imperial units with type safety
console.log("4. Imperial Units with Type Safety:");
const imperialResult = calculateBMIImperial(154, 5, 9);
console.log(`   Imperial: 154 lbs, 5'9"`);
console.log(`   Metric equivalent: ${lbsToKg(154)}kg, ${cmToMeters(175)}m`);
console.log(`   BMI: ${imperialResult.bmi}`);
console.log(`   Category: ${imperialResult.categoryName}`);
console.log("");

// Example 5: Array of BMI calculations with proper typing
console.log("5. Array of BMI Calculations:");
const people: Array<{ name: string; weight: number; height: number }> = [
  { name: "Alice", weight: 55, height: 1.65 },
  { name: "Bob", weight: 75, height: 1.8 },
  { name: "Charlie", weight: 85, height: 1.7 },
  { name: "Diana", weight: 95, height: 1.6 },
];

const bmiResults: Array<{ name: string; result: BMIResult }> = people.map(
  (person) => ({
    name: person.name,
    result: calculateBMI({ weight: person.weight, height: person.height }),
  })
);

bmiResults.forEach(({ name, result }) => {
  console.log(`   ${name}: BMI ${result.bmi} (${result.categoryName})`);
});
console.log("");

// Example 6: Type-safe error handling
console.log("6. Type-Safe Error Handling:");
function safeBMICalculation(input: BMIInput): BMIResult | null {
  try {
    return calculateBMI(input);
  } catch (error) {
    console.log(
      `   Error calculating BMI: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    return null;
  }
}

const validResult = safeBMICalculation({ weight: 70, height: 1.75 });
const invalidResult = safeBMICalculation({ weight: -70, height: 1.75 });

if (validResult) {
  console.log(`   Valid calculation: BMI ${validResult.bmi}`);
} else {
  console.log(`   Valid calculation: Failed`);
}

if (invalidResult) {
  console.log(`   Invalid calculation: BMI ${invalidResult.bmi}`);
} else {
  console.log(`   Invalid calculation: Failed (as expected)`);
}
console.log("");

console.log("=== End of TypeScript Examples ===");
