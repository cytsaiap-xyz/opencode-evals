type Result<T> = { success: true; data: T } | { success: false; error: string };

// Unsafe: will throw on invalid JSON
function parseConfig(jsonString: string) {
  const config = JSON.parse(jsonString);
  return config.database.host;
}

// Unsafe: will throw on divide by zero or non-numeric input
function calculateAverage(numbers: number[]) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

// Unsafe: will throw if data is malformed
function extractUserEmails(data: string): string[] {
  const parsed = JSON.parse(data);
  return parsed.users.map((u: { email: string }) => u.email);
}

export { parseConfig, calculateAverage, extractUserEmails };
export type { Result };
