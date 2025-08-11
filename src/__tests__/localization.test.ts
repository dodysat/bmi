import {
  getLocale,
  getSupportedLocales,
  isLocaleSupported,
  type Locale,
} from "../locales";
import {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
} from "../bmi-calculator";
import { BMICategory } from "../types";

describe("Localization", () => {
  describe("Locale functions", () => {
    it("should get English locale data", () => {
      const enLocale = getLocale("en");
      expect(enLocale.categories.normal_weight.name).toBe("Normal Weight");
      expect(enLocale.categories.underweight.name).toBe("Underweight");
      expect(enLocale.errors.weight_positive).toBe(
        "Weight must be a positive number in kilograms"
      );
    });

    it("should get Indonesian locale data", () => {
      const idLocale = getLocale("id");
      expect(idLocale.categories.normal_weight.name).toBe("Normal");
      expect(idLocale.categories.underweight.name).toBe("Kurus");
      expect(idLocale.errors.weight_positive).toBe(
        "Berat badan harus berupa angka positif dalam kilogram"
      );
    });

    it("should throw error for unsupported locale", () => {
      expect(() => getLocale("fr" as Locale)).toThrow(
        "Unsupported locale: fr. Supported locales: en, id"
      );
    });

    it("should get supported locales", () => {
      const supported = getSupportedLocales();
      expect(supported).toEqual(["en", "id"]);
    });

    it("should check if locale is supported", () => {
      expect(isLocaleSupported("en")).toBe(true);
      expect(isLocaleSupported("id")).toBe(true);
      expect(isLocaleSupported("fr")).toBe(false);
      expect(isLocaleSupported("")).toBe(false);
    });
  });

  describe("BMI calculation with localization", () => {
    it("should calculate BMI with English locale", () => {
      const result = calculateBMI({ weight: 70, height: 1.75, locale: "en" });
      expect(result.categoryName).toBe("Normal Weight");
      expect(result.recommendations[0]).toContain("Maintain current weight");
    });

    it("should calculate BMI with Indonesian locale", () => {
      const result = calculateBMI({ weight: 70, height: 1.75, locale: "id" });
      expect(result.categoryName).toBe("Normal");
      expect(result.recommendations[0]).toContain("Pertahankan berat badan");
    });

    it("should default to English when no locale specified", () => {
      const result = calculateBMI({ weight: 70, height: 1.75 });
      expect(result.categoryName).toBe("Normal Weight");
    });

    it("should show localized error messages in English", () => {
      try {
        calculateBMI({ weight: -70, height: 1.75, locale: "en" });
        fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          "Weight must be a positive number in kilograms"
        );
      }
    });

    it("should show localized error messages in Indonesian", () => {
      try {
        calculateBMI({ weight: -70, height: 1.75, locale: "id" });
        fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe(
          "Berat badan harus berupa angka positif dalam kilogram"
        );
      }
    });
  });

  describe("calculateBMISimple with localization", () => {
    it("should work with English locale", () => {
      const result = calculateBMISimple(70, 1.75, "en");
      expect(result.categoryName).toBe("Normal Weight");
    });

    it("should work with Indonesian locale", () => {
      const result = calculateBMISimple(70, 1.75, "id");
      expect(result.categoryName).toBe("Normal");
    });

    it("should default to English when no locale specified", () => {
      const result = calculateBMISimple(70, 1.75);
      expect(result.categoryName).toBe("Normal Weight");
    });
  });

  describe("calculateBMIImperial with localization", () => {
    it("should work with English locale", () => {
      const result = calculateBMIImperial(154, 5, 9, "en");
      expect(result.categoryName).toBe("Normal Weight");
    });

    it("should work with Indonesian locale", () => {
      const result = calculateBMIImperial(154, 5, 9, "id");
      expect(result.categoryName).toBe("Normal");
    });

    it("should default to English when no locale specified", () => {
      const result = calculateBMIImperial(154, 5, 9);
      expect(result.categoryName).toBe("Normal Weight");
    });
  });

  describe("All BMI categories in both languages", () => {
    const testCases = [
      {
        weight: 50,
        height: 1.75,
        enCategory: "Underweight",
        idCategory: "Kurus",
      },
      {
        weight: 70,
        height: 1.75,
        enCategory: "Normal Weight",
        idCategory: "Normal",
      },
      {
        weight: 80,
        height: 1.7,
        enCategory: "Overweight",
        idCategory: "Kelebihan Berat Badan",
      },
      {
        weight: 90,
        height: 1.7,
        enCategory: "Obese Class I",
        idCategory: "Obesitas Kelas I",
      },
      {
        weight: 105,
        height: 1.7,
        enCategory: "Obese Class II",
        idCategory: "Obesitas Kelas II",
      },
      {
        weight: 120,
        height: 1.7,
        enCategory: "Obese Class III (Severe Obesity)",
        idCategory: "Obesitas Kelas III (Obesitas Berat)",
      },
    ];

    testCases.forEach(({ weight, height, enCategory, idCategory }) => {
      it(`should categorize correctly in English: ${enCategory}`, () => {
        const result = calculateBMI({ weight, height, locale: "en" });
        expect(result.categoryName).toBe(enCategory);
      });

      it(`should categorize correctly in Indonesian: ${idCategory}`, () => {
        const result = calculateBMI({ weight, height, locale: "id" });
        expect(result.categoryName).toBe(idCategory);
      });
    });
  });

  describe("Locale data structure", () => {
    it("should have complete English locale data", () => {
      const enLocale = getLocale("en");

      // Check categories
      expect(enLocale.categories).toHaveProperty("underweight");
      expect(enLocale.categories).toHaveProperty("normal_weight");
      expect(enLocale.categories).toHaveProperty("overweight");
      expect(enLocale.categories).toHaveProperty("obese_class_i");
      expect(enLocale.categories).toHaveProperty("obese_class_ii");
      expect(enLocale.categories).toHaveProperty("obese_class_iii");

      // Check each category has required properties
      Object.values(enLocale.categories).forEach((category) => {
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("range");
        expect(category).toHaveProperty("recommendations");
        expect(Array.isArray(category.recommendations)).toBe(true);
        expect(category.recommendations.length).toBeGreaterThan(0);
      });

      // Check errors
      expect(enLocale.errors).toHaveProperty("weight_positive");
      expect(enLocale.errors).toHaveProperty("height_positive");
      expect(enLocale.errors).toHaveProperty("height_unrealistic");
      expect(enLocale.errors).toHaveProperty("weight_unrealistic");
      expect(enLocale.errors).toHaveProperty("cm_positive");
      expect(enLocale.errors).toHaveProperty("lbs_positive");

      // Check units
      expect(enLocale.units).toHaveProperty("kg");
      expect(enLocale.units).toHaveProperty("m");
      expect(enLocale.units).toHaveProperty("cm");
      expect(enLocale.units).toHaveProperty("lbs");
      expect(enLocale.units).toHaveProperty("feet");
      expect(enLocale.units).toHaveProperty("inches");
    });

    it("should have complete Indonesian locale data", () => {
      const idLocale = getLocale("id");

      // Check categories
      expect(idLocale.categories).toHaveProperty("underweight");
      expect(idLocale.categories).toHaveProperty("normal_weight");
      expect(idLocale.categories).toHaveProperty("overweight");
      expect(idLocale.categories).toHaveProperty("obese_class_i");
      expect(idLocale.categories).toHaveProperty("obese_class_ii");
      expect(idLocale.categories).toHaveProperty("obese_class_iii");

      // Check each category has required properties
      Object.values(idLocale.categories).forEach((category) => {
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("range");
        expect(category).toHaveProperty("recommendations");
        expect(Array.isArray(category.recommendations)).toBe(true);
        expect(category.recommendations.length).toBeGreaterThan(0);
      });

      // Check errors
      expect(idLocale.errors).toHaveProperty("weight_positive");
      expect(idLocale.errors).toHaveProperty("height_positive");
      expect(idLocale.errors).toHaveProperty("height_unrealistic");
      expect(idLocale.errors).toHaveProperty("weight_unrealistic");
      expect(idLocale.errors).toHaveProperty("cm_positive");
      expect(idLocale.errors).toHaveProperty("lbs_positive");

      // Check units
      expect(idLocale.units).toHaveProperty("kg");
      expect(idLocale.units).toHaveProperty("m");
      expect(idLocale.units).toHaveProperty("cm");
      expect(idLocale.units).toHaveProperty("lbs");
      expect(idLocale.units).toHaveProperty("feet");
      expect(idLocale.units).toHaveProperty("inches");
    });
  });
});
