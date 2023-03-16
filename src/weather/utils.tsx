export const CelsiusToFahrenheitConverter = (celsius?: number): number | null => {
  if (!celsius || typeof celsius !== 'number') return null;

  const fahrenheit = (celsius * 1.8) + 32;
  return Math.round(fahrenheit);
}

export const FahrenheitToCelsiusConverter = (fahrenheit?: number): number | null => {
  if (!fahrenheit || typeof fahrenheit !== 'number') return null;
  const celsius = (fahrenheit - 32) / 1.8;
  return Math.round(celsius);
} 