/**
 * Converts temperature from Celsius to Fahrenheit
 * @param celsius - Temperature in Celsius
 * @returns Temperature in Fahrenheit, rounded to nearest integer
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5) + 32);
} 