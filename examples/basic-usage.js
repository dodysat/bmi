const {
  calculateBMI,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
} = require("@dodysat/bmi");

console.log("=== BMI Calculator Examples ===\n");

// Example 1: Basic BMI calculation (metric)
console.log("1. Basic BMI Calculation (Metric):");
const result1 = calculateBMI({ weight: 70, height: 1.75 });
console.log(`   Weight: 70kg, Height: 1.75m`);
console.log(`   BMI: ${result1.bmi}`);
console.log(`   Category: ${result1.categoryName}`);
console.log(`   Range: ${result1.range}`);
console.log(`   Recommendations:`);
result1.recommendations.forEach((rec) => console.log(`     - ${rec}`));
console.log("");

// Example 2: Imperial units
console.log("2. BMI Calculation (Imperial):");
const result2 = calculateBMIImperial(154, 5, 9); // 5'9", 154 lbs
console.log(`   Weight: 154 lbs, Height: 5'9"`);
console.log(`   BMI: ${result2.bmi}`);
console.log(`   Category: ${result2.categoryName}`);
console.log("");

// Example 3: Unit conversions
console.log("3. Unit Conversions:");
const heightInCm = 175;
const weightInLbs = 154.32;
const heightInMeters = cmToMeters(heightInCm);
const weightInKg = lbsToKg(weightInLbs);
console.log(`   ${heightInCm}cm = ${heightInMeters}m`);
console.log(`   ${weightInLbs}lbs = ${weightInKg}kg`);
console.log("");

// Example 4: Different BMI categories
console.log("4. Different BMI Categories:");
const examples = [
  { weight: 50, height: 1.75, description: "Underweight" },
  { weight: 70, height: 1.75, description: "Normal Weight" },
  { weight: 80, height: 1.7, description: "Overweight" },
  { weight: 90, height: 1.7, description: "Obese Class I" },
  { weight: 105, height: 1.7, description: "Obese Class II" },
  { weight: 120, height: 1.7, description: "Obese Class III" },
];

examples.forEach((example) => {
  const result = calculateBMI(example);
  console.log(
    `   ${example.description}: BMI ${result.bmi} (${result.categoryName})`
  );
});
console.log("");

// Example 5: Error handling
console.log("5. Error Handling:");
try {
  calculateBMI({ weight: -70, height: 1.75 });
} catch (error) {
  console.log(`   Error caught: ${error.message}`);
}

try {
  calculateBMI({ weight: 70, height: 0 });
} catch (error) {
  console.log(`   Error caught: ${error.message}`);
}
console.log("");

console.log("=== End of Examples ===");
