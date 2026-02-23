import { expect, test } from 'vitest';
import { processRecord, groupByGrade, flatten } from './transform';

test('processRecord converts raw to processed', () => {
  const raw = { first_name: 'Alice', last_name: 'Smith', date_of_birth: '2000-01-15', score: '95.5' };
  const result = processRecord(raw);
  expect(result.fullName).toBe('Alice Smith');
  expect(result.score).toBe(95.5);
  expect(result.grade).toBe('A');
  expect(typeof result.age).toBe('number');
  expect(result.age).toBeGreaterThanOrEqual(20);
});

test('processRecord assigns correct grades', () => {
  expect(processRecord({ first_name: 'A', last_name: 'B', date_of_birth: '2000-01-01', score: '95' }).grade).toBe('A');
  expect(processRecord({ first_name: 'A', last_name: 'B', date_of_birth: '2000-01-01', score: '85' }).grade).toBe('B');
  expect(processRecord({ first_name: 'A', last_name: 'B', date_of_birth: '2000-01-01', score: '75' }).grade).toBe('C');
  expect(processRecord({ first_name: 'A', last_name: 'B', date_of_birth: '2000-01-01', score: '65' }).grade).toBe('D');
  expect(processRecord({ first_name: 'A', last_name: 'B', date_of_birth: '2000-01-01', score: '55' }).grade).toBe('F');
});

test('groupByGrade groups records correctly', () => {
  const records = [
    { fullName: 'Alice', age: 25, score: 95, grade: 'A' as const },
    { fullName: 'Bob', age: 22, score: 85, grade: 'B' as const },
    { fullName: 'Carol', age: 23, score: 92, grade: 'A' as const },
  ];
  const grouped = groupByGrade(records);
  expect(grouped['A']).toHaveLength(2);
  expect(grouped['B']).toHaveLength(1);
});

test('flatten handles nested objects', () => {
  expect(flatten({ a: { b: 1, c: { d: 2 } } })).toEqual({ 'a.b': 1, 'a.c.d': 2 });
  expect(flatten({ x: 1, y: 2 })).toEqual({ x: 1, y: 2 });
  expect(flatten({})).toEqual({});
});
