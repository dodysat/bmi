const {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  getLocale,
  getSupportedLocales,
  isLocaleSupported,
} = require("@dodysat/bmi");

console.log("=== BMI Calculator Localization Examples ===\n");

// Example 1: Check supported locales
console.log("1. Supported Locales:");
const supportedLocales = getSupportedLocales();
console.log(`   Supported locales: ${supportedLocales.join(", ")}`);
console.log(`   Is 'en' supported? ${isLocaleSupported("en")}`);
console.log(`   Is 'id' supported? ${isLocaleSupported("id")}`);
console.log(`   Is 'fr' supported? ${isLocaleSupported("fr")}`);
console.log("");

// Example 2: Get locale data
console.log("2. Locale Data:");
const enLocale = getLocale("en");
const idLocale = getLocale("id");

console.log("   English categories:");
Object.entries(enLocale.categories).forEach(([key, category]) => {
  console.log(`     ${key}: ${category.name}`);
});

console.log("\n   Indonesian categories:");
Object.entries(idLocale.categories).forEach(([key, category]) => {
  console.log(`     ${key}: ${category.name}`);
});
console.log("");

// Example 3: BMI calculation with different locales
console.log("3. BMI Calculation with Different Locales:");
const weight = 70;
const height = 1.75;

const resultEn = calculateBMI({ weight, height, locale: "en" });
const resultId = calculateBMI({ weight, height, locale: "id" });

console.log(`   English (${weight}kg, ${height}m):`);
console.log(`     BMI: ${resultEn.bmi}`);
console.log(`     Category: ${resultEn.categoryName}`);
console.log(`     Range: ${resultEn.range}`);
console.log(`     First recommendation: ${resultEn.recommendations[0]}`);

console.log(`\n   Indonesian (${weight}kg, ${height}m):`);
console.log(`     BMI: ${resultId.bmi}`);
console.log(`     Category: ${resultId.categoryName}`);
console.log(`     Range: ${resultId.range}`);
console.log(`     First recommendation: ${resultId.recommendations[0]}`);
console.log("");

// Example 4: Different BMI categories in both languages
console.log("4. Different BMI Categories in Both Languages:");
const examples = [
  { weight: 50, height: 1.75, description: "Underweight/Kurus" },
  { weight: 70, height: 1.75, description: "Normal Weight/Berat Badan Normal" },
  { weight: 80, height: 1.7, description: "Overweight/Kelebihan Berat Badan" },
  { weight: 90, height: 1.7, description: "Obese Class I/Obesitas Kelas I" },
  { weight: 105, height: 1.7, description: "Obese Class II/Obesitas Kelas II" },
  {
    weight: 120,
    height: 1.7,
    description: "Obese Class III/Obesitas Kelas III",
  },
];

examples.forEach((example) => {
  const enResult = calculateBMI({
    weight: example.weight,
    height: example.height,
    locale: "en",
  });
  const idResult = calculateBMI({
    weight: example.weight,
    height: example.height,
    locale: "id",
  });

  console.log(`   ${example.description}:`);
  console.log(`     English: ${enResult.categoryName} (BMI ${enResult.bmi})`);
  console.log(
    `     Indonesian: ${idResult.categoryName} (BMI ${idResult.bmi})`
  );
});
console.log("");

// Example 5: Localized error messages
console.log("5. Localized Error Messages:");
try {
  calculateBMI({ weight: -70, height: 1.75, locale: "en" });
} catch (error) {
  console.log(`   English error: ${error.message}`);
}

try {
  calculateBMI({ weight: -70, height: 1.75, locale: "id" });
} catch (error) {
  console.log(`   Indonesian error: ${error.message}`);
}
console.log("");

// Example 6: Using convenience functions with localization
console.log("6. Convenience Functions with Localization:");
const simpleEn = calculateBMISimple(70, 1.75, "en");
const simpleId = calculateBMISimple(70, 1.75, "id");

console.log(`   calculateBMISimple English: ${simpleEn.categoryName}`);
console.log(`   calculateBMISimple Indonesian: ${simpleId.categoryName}`);

const imperialEn = calculateBMIImperial(154, 5, 9, "en");
const imperialId = calculateBMIImperial(154, 5, 9, "id");

console.log(`   calculateBMIImperial English: ${imperialEn.categoryName}`);
console.log(`   calculateBMIImperial Indonesian: ${imperialId.categoryName}`);
console.log("");

// Example 7: Default locale behavior
console.log("7. Default Locale Behavior:");
const defaultResult = calculateBMI({ weight: 70, height: 1.75 });
console.log(`   Default (no locale specified): ${defaultResult.categoryName}`);
console.log(
  `   This should match English: ${
    defaultResult.categoryName === "Normal Weight"
  }`
);
console.log("");

console.log("=== End of Localization Examples ===");
