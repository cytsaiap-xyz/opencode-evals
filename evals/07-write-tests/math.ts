/**
 * Returns the factorial of a non-negative integer.
 * Throws for negative numbers.
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Negative number');
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

/**
 * Returns the fibonacci number at position n (0-indexed).
 * fib(0) = 0, fib(1) = 1, fib(2) = 1, fib(3) = 2, ...
 */
export function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

/**
 * Returns true if the string is a palindrome (case-insensitive, ignoring spaces).
 */
export function isPalindrome(str: string): boolean {
  const clean = str.toLowerCase().replace(/\s/g, '');
  return clean === clean.split('').reverse().join('');
}

/**
 * Returns the unique elements of an array while preserving order.
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
