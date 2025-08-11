import {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  getLocale,
  getSupportedLocales,
  isLocaleSupported,
  type Locale,
  type LocaleData,
} from "@dodysat/bmi";

console.log("=== BMI Calculator Localization Examples (TypeScript) ===\n");

// Example 1: Type-safe locale handling
console.log("1. Type-Safe Locale Handling:");
const supportedLocales: Locale[] = getSupportedLocales();
console.log(`   Supported locales: ${supportedLocales.join(", ")}`);

// Type-safe locale checking
function processLocale(locale: string): void {
  if (isLocaleSupported(locale)) {
    const localeData: LocaleData = getLocale(locale);
    console.log(
      `   ✅ ${locale} is supported. Normal weight category: ${localeData.categories.normal_weight.name}`
    );
  } else {
    console.log(`   ❌ ${locale} is not supported`);
  }
}

processLocale("en");
processLocale("id");
processLocale("fr");
console.log("");

// Example 2: Localized BMI analysis function
console.log("2. Localized BMI Analysis Function:");
function analyzeBMILocalized(
  weight: number,
  height: number,
  locale: Locale = "en"
): void {
  try {
    const result = calculateBMI({ weight, height, locale });
    const localeData = getLocale(locale);

    console.log(`   Analysis (${locale}):`);
    console.log(`     Weight: ${weight} ${localeData.units.kg}`);
    console.log(`     Height: ${height} ${localeData.units.m}`);
    console.log(`     BMI: ${result.bmi}`);
    console.log(`     Category: ${result.categoryName}`);
    console.log(`     Range: ${result.range}`);
    console.log(`     Recommendations:`);
    result.recommendations.forEach((rec, index) => {
      console.log(`       ${index + 1}. ${rec}`);
    });
  } catch (error) {
    console.error(
      `   Error (${locale}): ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

analyzeBMILocalized(70, 1.75, "en");
console.log("");
analyzeBMILocalized(70, 1.75, "id");
console.log("");

// Example 3: Multi-language BMI comparison
console.log("3. Multi-Language BMI Comparison:");
interface BMICategoryComparison {
  weight: number;
  height: number;
  english: string;
  indonesian: string;
}

const comparisons: BMICategoryComparison[] = [
  { weight: 50, height: 1.75, english: "", indonesian: "" },
  { weight: 70, height: 1.75, english: "", indonesian: "" },
  { weight: 80, height: 1.7, english: "", indonesian: "" },
  { weight: 90, height: 1.7, english: "", indonesian: "" },
  { weight: 105, height: 1.7, english: "", indonesian: "" },
  { weight: 120, height: 1.7, english: "", indonesian: "" },
];

// Populate the comparisons
comparisons.forEach((comparison) => {
  const enResult = calculateBMI({
    weight: comparison.weight,
    height: comparison.height,
    locale: "en",
  });
  const idResult = calculateBMI({
    weight: comparison.weight,
    height: comparison.height,
    locale: "id",
  });

  comparison.english = enResult.categoryName;
  comparison.id = idResult.categoryName;
});

console.log("   BMI Category Comparison:");
comparisons.forEach((comparison, index) => {
  console.log(
    `   ${index + 1}. BMI ${
      calculateBMI({ weight: comparison.weight, height: comparison.height }).bmi
    }:`
  );
  console.log(`      English: ${comparison.english}`);
  console.log(`      Indonesian: ${comparison.indonesian}`);
});
console.log("");

// Example 4: Locale-aware error handling
console.log("4. Locale-Aware Error Handling:");
function safeBMICalculationLocalized(
  weight: number,
  height: number,
  locale: Locale
): string {
  try {
    const result = calculateBMI({ weight, height, locale });
    return `${result.categoryName} (BMI: ${result.bmi})`;
  } catch (error) {
    const localeData = getLocale(locale);
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

const testCases = [
  { weight: 70, height: 1.75, description: "Valid input" },
  { weight: -70, height: 1.75, description: "Negative weight" },
  { weight: 70, height: 0, description: "Zero height" },
  { weight: 1500, height: 1.75, description: "Unrealistic weight" },
];

testCases.forEach((testCase) => {
  console.log(`   ${testCase.description}:`);
  console.log(
    `     English: ${safeBMICalculationLocalized(
      testCase.weight,
      testCase.height,
      "en"
    )}`
  );
  console.log(
    `     Indonesian: ${safeBMICalculationLocalized(
      testCase.weight,
      testCase.height,
      "id"
    )}`
  );
});
console.log("");

// Example 5: Dynamic locale selection
console.log("5. Dynamic Locale Selection:");
function getBMICategoryInLanguage(bmi: number, locale: Locale): string {
  // Calculate BMI to get category
  const weight = 70; // arbitrary weight
  const height = Math.sqrt(weight / bmi);

  const result = calculateBMI({ weight, height, locale });
  return result.categoryName;
}

const bmiValues = [16, 20, 25, 30, 35, 40];
console.log("   BMI Categories in Different Languages:");
bmiValues.forEach((bmi) => {
  const enCategory = getBMICategoryInLanguage(bmi, "en");
  const idCategory = getBMICategoryInLanguage(bmi, "id");
  console.log(`   BMI ${bmi}: ${enCategory} / ${idCategory}`);
});
console.log("");

// Example 6: Locale data inspection
console.log("6. Locale Data Inspection:");
function inspectLocaleData(locale: Locale): void {
  const localeData = getLocale(locale);

  console.log(`   ${locale.toUpperCase()} Locale Data:`);
  console.log(`     Categories: ${Object.keys(localeData.categories).length}`);
  console.log(`     Error messages: ${Object.keys(localeData.errors).length}`);
  console.log(`     Units: ${Object.keys(localeData.units).length}`);

  // Show some sample data
  console.log(`     Sample category names:`);
  Object.entries(localeData.categories).forEach(([key, category]) => {
    console.log(`       ${key}: ${category.name}`);
  });
}

inspectLocaleData("en");
console.log("");
inspectLocaleData("id");
console.log("");

console.log("=== End of TypeScript Localization Examples ===");
