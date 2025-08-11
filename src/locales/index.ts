import { en } from './en';
import { id } from './id';

export type Locale = 'en' | 'id';

export interface LocaleData {
  categories: {
    underweight: {
      name: string;
      range: string;
      recommendations: string[];
    };
    normal_weight: {
      name: string;
      range: string;
      recommendations: string[];
    };
    overweight: {
      name: string;
      range: string;
      recommendations: string[];
    };
    obese_class_i: {
      name: string;
      range: string;
      recommendations: string[];
    };
    obese_class_ii: {
      name: string;
      range: string;
      recommendations: string[];
    };
    obese_class_iii: {
      name: string;
      range: string;
      recommendations: string[];
    };
  };
  errors: {
    weight_positive: string;
    height_positive: string;
    height_unrealistic: string;
    weight_unrealistic: string;
    cm_positive: string;
    lbs_positive: string;
  };
  units: {
    kg: string;
    m: string;
    cm: string;
    lbs: string;
    feet: string;
    inches: string;
  };
}

const locales: Record<Locale, LocaleData> = {
  en,
  id
};

/**
 * Get locale data for the specified language
 * @param locale - The locale to get data for ('en' or 'id')
 * @returns The locale data
 * @throws Error if locale is not supported
 */
export function getLocale(locale: Locale): LocaleData {
  if (!locales[locale]) {
    throw new Error(`Unsupported locale: ${locale}. Supported locales: ${Object.keys(locales).join(', ')}`);
  }
  return locales[locale];
}

/**
 * Get all supported locales
 * @returns Array of supported locale codes
 */
export function getSupportedLocales(): Locale[] {
  return Object.keys(locales) as Locale[];
}

/**
 * Check if a locale is supported
 * @param locale - The locale to check
 * @returns True if the locale is supported
 */
export function isLocaleSupported(locale: string): locale is Locale {
  return locale in locales;
}

export { en, id };
