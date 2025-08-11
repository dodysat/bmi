# @dodysat/bmi

A comprehensive BMI (Body Mass Index) calculator library following WHO (World Health Organization) standards. This library provides accurate BMI calculations with proper categorization and health recommendations based on international guidelines.

## Features

- ✅ **WHO Standard Compliance**: Follows World Health Organization BMI categories and thresholds
- ✅ **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- ✅ **Multiple Unit Support**: Metric and Imperial unit conversions
- ✅ **Health Recommendations**: WHO-based health recommendations for each BMI category
- ✅ **Input Validation**: Robust input validation with helpful error messages
- ✅ **Comprehensive Testing**: 100% test coverage with edge case handling

## Installation

```bash
npm install @dodysat/bmi
```

## Quick Start

```typescript
import { calculateBMI, BMICategory } from '@dodysat/bmi';

// Calculate BMI for a person (70kg, 1.75m)
const result = calculateBMI({ weight: 70, height: 1.75 });

console.log(`BMI: ${result.bmi}`); // 22.86
console.log(`Category: ${result.categoryName}`); // "Normal Weight"
console.log(`Recommendations:`, result.recommendations);
```

## API Reference

### Main Functions

#### `calculateBMI(input: BMIInput): BMIResult`

Calculates BMI using metric units (kilograms and meters).

```typescript
import { calculateBMI } from '@dodysat/bmi';

const result = calculateBMI({ weight: 70, height: 1.75 });
```

**Parameters:**
- `input.weight`: Weight in kilograms (positive number)
- `input.height`: Height in meters (positive number)

**Returns:** `BMIResult` object with BMI value, category, and recommendations

#### `calculateBMISimple(weight: number, height: number): BMIResult`

Convenience function for calculating BMI with separate parameters.

```typescript
import { calculateBMISimple } from '@dodysat/bmi';

const result = calculateBMISimple(70, 1.75);
```

#### `calculateBMIImperial(weightInLbs: number, heightInFeet: number, heightInInches?: number): BMIResult`

Calculates BMI using Imperial units (pounds and feet/inches).

```typescript
import { calculateBMIImperial } from '@dodysat/bmi';

// 5 feet 9 inches, 154 pounds
const result = calculateBMIImperial(154, 5, 9);
```

### Utility Functions

#### `cmToMeters(heightInCm: number): number`

Converts height from centimeters to meters.

```typescript
import { cmToMeters } from '@dodysat/bmi';

const heightInMeters = cmToMeters(175); // 1.75
```

#### `lbsToKg(weightInLbs: number): number`

Converts weight from pounds to kilograms.

```typescript
import { lbsToKg } from '@dodysat/bmi';

const weightInKg = lbsToKg(154.32); // 70
```

### Types and Enums

#### `BMICategory`

```typescript
enum BMICategory {
  UNDERWEIGHT = 'underweight',
  NORMAL_WEIGHT = 'normal_weight',
  OVERWEIGHT = 'overweight',
  OBESE_CLASS_I = 'obese_class_i',
  OBESE_CLASS_II = 'obese_class_ii',
  OBESE_CLASS_III = 'obese_class_iii'
}
```

#### `BMIResult`

```typescript
interface BMIResult {
  bmi: number;                    // Calculated BMI value
  category: BMICategory;          // WHO BMI category
  categoryName: string;           // Human-readable category name
  range: string;                  // BMI range for the category
  recommendations: string[];      // Health recommendations
}
```

## WHO BMI Categories

This library follows the World Health Organization (WHO) BMI classification system:

| Category | BMI Range | Description |
|----------|-----------|-------------|
| Underweight | < 18.5 | Below healthy weight range |
| Normal Weight | 18.5 - 24.9 | Healthy weight range |
| Overweight | 25.0 - 29.9 | Above healthy weight range |
| Obese Class I | 30.0 - 34.9 | Moderate obesity |
| Obese Class II | 35.0 - 39.9 | Severe obesity |
| Obese Class III | ≥ 40.0 | Very severe obesity |

## Usage Examples

### Basic BMI Calculation

```typescript
import { calculateBMI } from '@dodysat/bmi';

const result = calculateBMI({ weight: 70, height: 1.75 });

console.log(`Your BMI is: ${result.bmi}`);
console.log(`Category: ${result.categoryName}`);
console.log(`Range: ${result.range}`);
console.log('Recommendations:');
result.recommendations.forEach(rec => console.log(`- ${rec}`));
```

### Using Imperial Units

```typescript
import { calculateBMIImperial } from '@dodysat/bmi';

// Calculate BMI for someone who is 5'9" and 154 lbs
const result = calculateBMIImperial(154, 5, 9);

console.log(`BMI: ${result.bmi}`); // ~22.75
console.log(`Category: ${result.categoryName}`); // "Normal Weight"
```

### Unit Conversions

```typescript
import { calculateBMI, cmToMeters, lbsToKg } from '@dodysat/bmi';

// Convert from cm and lbs to metric
const heightInMeters = cmToMeters(175); // 1.75
const weightInKg = lbsToKg(154.32); // 70

const result = calculateBMI({ weight: weightInKg, height: heightInMeters });
```

### Error Handling

```typescript
import { calculateBMI } from '@dodysat/bmi';

try {
  const result = calculateBMI({ weight: 70, height: 1.75 });
  console.log(`BMI: ${result.bmi}`);
} catch (error) {
  console.error('BMI calculation error:', error.message);
}
```

## Error Messages

The library provides clear error messages for invalid inputs:

- `"Weight must be a positive number in kilograms"`
- `"Height must be a positive number in meters"`
- `"Height seems unusually high. Please ensure height is in meters, not centimeters"`
- `"Weight seems unusually high. Please ensure weight is in kilograms"`

## Development

### Building the Library

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Running Tests in Watch Mode

```bash
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## References

- [WHO BMI Classification](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)
- [WHO Guidelines for BMI](https://www.who.int/health-topics/body-mass-index)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/dodysat/bmi/issues) on GitHub.
