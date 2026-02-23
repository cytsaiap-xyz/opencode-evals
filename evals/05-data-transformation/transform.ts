interface RawRecord {
  first_name: string;
  last_name: string;
  date_of_birth: string; // "YYYY-MM-DD"
  score: string; // numeric string like "95.5"
}

interface ProcessedRecord {
  fullName: string;
  age: number;
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

/**
 * Convert a raw record to a processed record.
 * - fullName: "FirstName LastName"
 * - age: calculated from date_of_birth to today
 * - score: parsed as a float
 * - grade: A (>=90), B (>=80), C (>=70), D (>=60), F (<60)
 */
export function processRecord(raw: RawRecord): ProcessedRecord {
  // TODO: implement
  throw new Error('Not implemented');
}

/**
 * Group an array of processed records by their grade.
 * Returns an object with grade keys and arrays of records as values.
 */
export function groupByGrade(records: ProcessedRecord[]): Record<string, ProcessedRecord[]> {
  // TODO: implement
  throw new Error('Not implemented');
}

/**
 * Flatten a nested object into a flat object with dot-notation keys.
 * Example: { a: { b: 1, c: { d: 2 } } } => { "a.b": 1, "a.c.d": 2 }
 */
export function flatten(obj: Record<string, unknown>, prefix?: string): Record<string, unknown> {
  // TODO: implement
  throw new Error('Not implemented');
}

export type { RawRecord, ProcessedRecord };
