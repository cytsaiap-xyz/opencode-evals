import { expect, test } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, 'api.ts');

test('functions return Result type', () => {
  const content = readFileSync(filePath, 'utf-8');
  expect(content).toMatch(/Result/);
  expect(content).toMatch(/success.*true/);
  expect(content).toMatch(/success.*false/);
});

test('parseConfig has try-catch or error handling', () => {
  const content = readFileSync(filePath, 'utf-8');
  expect(content).toMatch(/try\s*\{|catch|Error|error/);
});

test('calculateAverage handles empty array', () => {
  const content = readFileSync(filePath, 'utf-8');
  // Should check for empty array or zero length
  expect(content).toMatch(/length\s*===?\s*0|\.length\s*[<!=]/);
});

test('extractUserEmails has error handling', () => {
  const content = readFileSync(filePath, 'utf-8');
  // Should have try-catch around JSON.parse and property access
  expect(content).toMatch(/try\s*\{[\s\S]*JSON\.parse[\s\S]*catch/);
});

test('all functions are exported', () => {
  const content = readFileSync(filePath, 'utf-8');
  expect(content).toMatch(/export.*parseConfig/);
  expect(content).toMatch(/export.*calculateAverage/);
  expect(content).toMatch(/export.*extractUserEmails/);
});

test('Result type is still exported', () => {
  const content = readFileSync(filePath, 'utf-8');
  expect(content).toMatch(/export.*Result/);
});
