import {
  calculateBMI,
  calculateBMISimple,
  calculateBMIImperial,
  cmToMeters,
  lbsToKg,
  WHO_BMI_THRESHOLDS,
} from "../bmi-calculator";
import { BMICategory } from "../types";

describe("BMI Calculator", () => {
  describe("calculateBMI", () => {
    it("should calculate BMI correctly for normal weight", () => {
      const result = calculateBMI({ weight: 70, height: 1.75 });
      expect(result.bmi).toBe(22.86);
      expect(result.category).toBe(BMICategory.NORMAL_WEIGHT);
      expect(result.categoryName).toBe("Normal Weight");
    });

    it("should categorize underweight correctly", () => {
      const result = calculateBMI({ weight: 50, height: 1.75 });
      expect(result.bmi).toBe(16.33);
      expect(result.category).toBe(BMICategory.UNDERWEIGHT);
      expect(result.categoryName).toBe("Underweight");
    });

    it("should categorize overweight correctly", () => {
      const result = calculateBMI({ weight: 80, height: 1.7 });
      expect(result.bmi).toBe(27.68);
      expect(result.category).toBe(BMICategory.OVERWEIGHT);
      expect(result.categoryName).toBe("Overweight");
    });

    it("should categorize obese class I correctly", () => {
      const result = calculateBMI({ weight: 90, height: 1.7 });
      expect(result.bmi).toBe(31.14);
      expect(result.category).toBe(BMICategory.OBESE_CLASS_I);
      expect(result.categoryName).toBe("Obese Class I");
    });

    it("should categorize obese class II correctly", () => {
      const result = calculateBMI({ weight: 105, height: 1.7 });
      expect(result.bmi).toBe(36.33);
      expect(result.category).toBe(BMICategory.OBESE_CLASS_II);
      expect(result.categoryName).toBe("Obese Class II");
    });

    it("should categorize obese class III correctly", () => {
      const result = calculateBMI({ weight: 120, height: 1.7 });
      expect(result.bmi).toBe(41.52);
      expect(result.category).toBe(BMICategory.OBESE_CLASS_III);
      expect(result.categoryName).toBe("Obese Class III (Severe Obesity)");
    });

    it("should include recommendations in result", () => {
      const result = calculateBMI({ weight: 70, height: 1.75 });
      expect(result.recommendations).toBeInstanceOf(Array);
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations[0]).toContain("Maintain current weight");
    });

    it("should include range information", () => {
      const result = calculateBMI({ weight: 70, height: 1.75 });
      expect(result.range).toBe("BMI 18.5 - 24.9");
    });
  });

  describe("Input validation", () => {
    it("should throw error for negative weight", () => {
      expect(() => calculateBMI({ weight: -70, height: 1.75 })).toThrow(
        "Weight must be a positive number in kilograms"
      );
    });

    it("should throw error for zero weight", () => {
      expect(() => calculateBMI({ weight: 0, height: 1.75 })).toThrow(
        "Weight must be a positive number in kilograms"
      );
    });

    it("should throw error for negative height", () => {
      expect(() => calculateBMI({ weight: 70, height: -1.75 })).toThrow(
        "Height must be a positive number in meters"
      );
    });

    it("should throw error for zero height", () => {
      expect(() => calculateBMI({ weight: 70, height: 0 })).toThrow(
        "Height must be a positive number in meters"
      );
    });

    it("should throw error for unrealistic height", () => {
      expect(() => calculateBMI({ weight: 70, height: 4 })).toThrow(
        "Height seems unusually high. Please ensure height is in meters, not centimeters"
      );
    });

    it("should throw error for unrealistic weight", () => {
      expect(() => calculateBMI({ weight: 1500, height: 1.75 })).toThrow(
        "Weight seems unusually high. Please ensure weight is in kilograms"
      );
    });

    it("should throw error for non-numeric weight", () => {
      expect(() =>
        calculateBMI({ weight: "abc" as any, height: 1.75 })
      ).toThrow("Weight must be a positive number in kilograms");
    });

    it("should throw error for non-numeric height", () => {
      expect(() => calculateBMI({ weight: 70, height: "abc" as any })).toThrow(
        "Height must be a positive number in meters"
      );
    });
  });

  describe("calculateBMISimple", () => {
    it("should work with separate weight and height parameters", () => {
      const result = calculateBMISimple(70, 1.75);
      expect(result.bmi).toBe(22.86);
      expect(result.category).toBe(BMICategory.NORMAL_WEIGHT);
    });
  });

  describe("Unit conversion functions", () => {
    describe("cmToMeters", () => {
      it("should convert centimeters to meters correctly", () => {
        expect(cmToMeters(175)).toBe(1.75);
        expect(cmToMeters(180)).toBe(1.8);
        expect(cmToMeters(160)).toBe(1.6);
      });

      it("should throw error for invalid input", () => {
        expect(() => cmToMeters(-175)).toThrow(
          "Height in centimeters must be a positive number"
        );
        expect(() => cmToMeters(0)).toThrow(
          "Height in centimeters must be a positive number"
        );
        expect(() => cmToMeters("abc" as any)).toThrow(
          "Height in centimeters must be a positive number"
        );
      });
    });

    describe("lbsToKg", () => {
      it("should convert pounds to kilograms correctly", () => {
        expect(lbsToKg(154.32)).toBe(70); // 154.32 lbs ≈ 70 kg
        expect(lbsToKg(220.46)).toBe(100); // 220.46 lbs ≈ 100 kg
      });

      it("should round to 2 decimal places", () => {
        expect(lbsToKg(150)).toBe(68.04);
      });

      it("should throw error for invalid input", () => {
        expect(() => lbsToKg(-150)).toThrow(
          "Weight in pounds must be a positive number"
        );
        expect(() => lbsToKg(0)).toThrow(
          "Weight in pounds must be a positive number"
        );
        expect(() => lbsToKg("abc" as any)).toThrow(
          "Weight in pounds must be a positive number"
        );
      });
    });
  });

  describe("calculateBMIImperial", () => {
    it("should calculate BMI using imperial units", () => {
      // 5'9" (5 feet 9 inches) and 154 lbs should be around 22.7 BMI
      const result = calculateBMIImperial(154, 5, 9);
      expect(result.bmi).toBeCloseTo(22.75, 1);
      expect(result.category).toBe(BMICategory.NORMAL_WEIGHT);
    });

    it("should work with feet only (no additional inches)", () => {
      const result = calculateBMIImperial(154, 6); // 6 feet, 0 inches
      expect(result.bmi).toBeCloseTo(20.87, 1);
      expect(result.category).toBe(BMICategory.NORMAL_WEIGHT);
    });

    it("should handle edge cases properly", () => {
      const result = calculateBMIImperial(300, 5, 6); // Obese case
      expect(result.category).toBe(BMICategory.OBESE_CLASS_III);
    });
  });

  describe("WHO BMI Thresholds", () => {
    it("should have correct WHO threshold values", () => {
      expect(WHO_BMI_THRESHOLDS.underweight).toBe(18.5);
      expect(WHO_BMI_THRESHOLDS.normalWeight).toBe(25.0);
      expect(WHO_BMI_THRESHOLDS.overweight).toBe(30.0);
      expect(WHO_BMI_THRESHOLDS.obeseClassI).toBe(35.0);
      expect(WHO_BMI_THRESHOLDS.obeseClassII).toBe(40.0);
      expect(WHO_BMI_THRESHOLDS.obeseClassIII).toBe(Infinity);
    });
  });

  describe("Boundary testing", () => {
    it("should handle BMI exactly at category boundaries", () => {
      // Test exact boundary values
      const underweightBoundary = calculateBMI({
        weight: 50,
        height: Math.sqrt(50 / 18.5),
      });
      expect(underweightBoundary.bmi).toBeCloseTo(18.5, 1);

      const normalBoundary = calculateBMI({
        weight: 70,
        height: Math.sqrt(70 / 25),
      });
      expect(normalBoundary.bmi).toBeCloseTo(25, 1);
    });

    it("should categorize boundary values correctly", () => {
      // BMI of exactly 18.5 should be normal weight (not underweight)
      const result1 = calculateBMI({ weight: 56.35, height: 1.75 }); // BMI = 18.4
      expect(result1.category).toBe(BMICategory.UNDERWEIGHT);

      const result2 = calculateBMI({ weight: 56.7, height: 1.75 }); // BMI ≈ 18.5
      expect(result2.category).toBe(BMICategory.NORMAL_WEIGHT);
    });
  });
});
