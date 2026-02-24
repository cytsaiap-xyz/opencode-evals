import { expect, test } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const testFilePath = join(__dirname, 'math.test.ts');

test('math.test.ts file exists', () => {
  expect(existsSync(testFilePath)).toBe(true);
});

test('test file imports from math.ts', () => {
  const content = readFileSync(testFilePath, 'utf-8');
  expect(content).toMatch(/import.*from\s+['"]\.\/math['"]/);
});

test('test file uses describe blocks', () => {
  const content = readFileSync(testFilePath, 'utf-8');
  expect(content).toMatch(/describe\s*\(/);
});

test('test file covers factorial', () => {
  const content = readFileSync(testFilePath, 'utf-8');
  expect(content).toMatch(/factorial/);
});

test('test file covers fibonacci', () => {
  const content = readFileSync(testFilePath, 'utf-8');
  expect(content).toMatch(/fibonacci/);
});

test('test file covers isPalindrome', () => {
  const content = readFileSync(testFilePath, 'utf-8');
  expect(content).toMatch(/isPalindrome|palindrome/i);
});

test('test file covers unique', () => {
  const content = readFileSync(testFilePath, 'utf-8');
  expect(content).toMatch(/unique/);
});

test('tests actually pass when run', () => {
  // Run only the user's math.test.ts, not the EVAL.ts
  const result = execSync('npx vitest run --config vitest.math.config.ts math.test.ts', { cwd: __dirname, encoding: 'utf-8', stdio: 'pipe' });
  expect(result).toMatch(/pass/i);
});
